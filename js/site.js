// site.js
import { events, getEvents } from "./events.js";
import { populateStateDropdown } from "./states.js";
import { saveData, addDataModalTemplate, clearFormFields, displayData} from "./formHandler.js";
import { validateForm, addOnBlurValidation } from "./validation.js";

document.addEventListener("DOMContentLoaded", () => {
    buildDropDown();
    updateCopyrightYear();
    window.getEvents = getEvents;
    
    // Insert modal into the DOM
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = addDataModalTemplate;

    // Call populateStateDropdown after modal is added to the DOM
    populateStateDropdown();
    // Modal setup
    const modalElement = document.getElementById('addData');
    const modalInstance = new bootstrap.Modal(modalElement);

    // Show the modal when needed
    document.getElementById("btnShowModal").addEventListener("click", () => {
        modalInstance.show();
    });
    document.getElementById("btnSaveData").addEventListener("click", (event) => {
        event.preventDefault();
        if (validateForm()) {
            saveData();
            buildDropDown(); // Refresh dropdown after save
            displayData();
    } else {
        alert("Please fix validation errors before submitting.");
    }
    });
    document.getElementById("btnClear").addEventListener("click", (event) => {
        event.preventDefault();
        clearFormFields();
    });

    addOnBlurValidation();
    const form = document.getElementById("newEventForm");
    form.addEventListener("submit", (event) => {
      if (!validateForm()) {
        event.preventDefault(); // Stop form submission if validation fails
        alert("Please fix validation errors before submitting.");
      }
    });
});

//builds dropdrown of locales
export function buildDropDown() {
    //grab the event drop down we want to add cities to:
    let eventDD = document.getElementById("eventDropDown");
    eventDD.innerHTML = "";
    //load links from template
    let ddTemplate = document.getElementById("cityDD-template");

    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
    //list of cities--create distinct list--no dupes--filter array
    const distinctCities = [...new Set(curEvents.map((e) => e.city))];

    //Use the template construction for the dropdown
    const addCityToDropdown = (city) => {
        const ddItemTemplate = document.importNode(ddTemplate.content, true);
        const li = ddItemTemplate.querySelector("li");
        const ddItem = ddItemTemplate.querySelector("a");
        ddItem.setAttribute("data-city", city);
        ddItem.textContent = city;
        eventDD.appendChild(li);
    };
    addCityToDropdown("All");
    distinctCities.forEach(addCityToDropdown);
    displayStats(curEvents);
    displayData();
}

 export function displayStats(filteredEvents) {
    const total = filteredEvents.reduce((sum, e) => sum + e.attendance, 0);
    const most = Math.max(...filteredEvents.map((e) => e.attendance));
    const least = Math.min(...filteredEvents.map((e) => e.attendance));
    const average = (total / filteredEvents.length) || 0;

    document.getElementById("total").textContent = total.toLocaleString();
    document.getElementById("most").textContent = most.toLocaleString();
    document.getElementById("least").textContent = least.toLocaleString();
    document.getElementById("average").textContent = average.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById("copyrightYear").textContent = currentYear;
  }
  

