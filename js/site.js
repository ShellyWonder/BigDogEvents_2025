import { events, getEvents } from "./events.js";
import { populateStateDropdown } from "./states.js";


document.addEventListener("DOMContentLoaded", () => {
    buildDropDown();
    updateCopyrightYear();
    populateStateDropdown();
    window.getEvents = getEvents;
});
//builds dropdrown of locales
function buildDropDown() {
    //grab the event drop down we want to add cities to:
    let eventDD = document.getElementById("eventDropDown");
    eventDD.innerHTML = "";
    //load links from template
    let ddTemplate = document.getElementById("cityDD-template");

    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
    //map the city property to a new array
    let cities = curEvents.map((e) => e.city);
    //list of cities--create distinct list--no dupes--filter array

    let distinctCities = [...new Set(cities)];

    //Use the template construction for the dropdown
    let ddItemTemplate = document.importNode(ddTemplate.content, true);
    let li = ddItemTemplate.querySelector("li")
    let ddItem = ddItemTemplate.querySelector("a");
    ddItem.setAttribute("data-city", "All");
    ddItem.textContent = "All";
    eventDD.appendChild(li);

    for (let index = 0; index < distinctCities.length; index++) {
        ddItemTemplate = document.importNode(ddTemplate.content, true);
        li = ddItemTemplate.querySelector("li")
        ddItem = ddItemTemplate.querySelector("a");
        ddItem.setAttribute("data-city", distinctCities[index]);
        ddItem.innerHTML = distinctCities[index];
        eventDD.appendChild(li);
    }
    //display the stats
    displayStats(curEvents);
    displayData();
}

export function displayStats(filteredEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let index = 0; index < filteredEvents.length; index++) {
        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;
        if (most < currentAttendance) {
            most = currentAttendance;
        }

        //least calculation
        if (least == -1 || least > currentAttendance) {
            least = currentAttendance;
        }


        //average is done outside the loop
        average = total / filteredEvents.length;

    }

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        "en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}
//show events f specific locale
//user selected city --function fires

//display all the events on page
function displayData() {
    let template = document.getElementById("eventData-template");
    let eventBody = document.getElementById("eventBody");
    eventBody.innerHTML = "";
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];
    if (curEvents.length == 0) {
        curEvents = events;
        localStorage.setItem("eventsArray", JSON.stringify(curEvents));
    }
    for (let index = 0; index < curEvents.length; index++) {
        let eventRow = document.importNode(template.content, true);
        let eventCols = eventRow.querySelectorAll("td");

        eventCols[0].textContent = curEvents[index].event;
        eventCols[1].textContent = curEvents[index].city;
        eventCols[2].textContent = curEvents[index].state;
        eventCols[3].textContent = curEvents[index].attendance;
        eventCols[4].textContent = curEvents[index] = new Date(
            curEvents[index].date).toLocaleDateString();

        eventBody.appendChild(eventRow);
    }
}

function saveData() {
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
    let obj = {};
    obj["event"] = document.getElementById("newEventName").value;
    obj["city"] = document.getElementById("newEventCity").value;
    let stateSel = document.getElementById("newEventState");
    obj["state"] = stateSel.options[stateSel.selectedIndex].text;
    obj["attendance"] = parseInt(document.getElementById("newEventAttendance").value, 10);
    let eventDate = document.getElementById("newEventDate").value;
    let eventDate2 = `${eventDate} 00:00`;
    obj["date"] = new Date(eventDate2).toLocaleString();
    curEvents.push(obj);
    localStorage.setItem("eventsArray", JSON.stringify(curEvents));
    buildDropDown();
    displayData();
}
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById("copyrightYear").textContent = currentYear;
  }

  // Add these lines at the bottom of site.js
window.addEventListener('load', buildDropDown);
document.getElementById("btnSaveData").addEventListener("click", saveData);
// document.getElementById("ddEvents").addEventListener("change", getEvents);