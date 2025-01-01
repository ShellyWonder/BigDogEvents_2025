//FORM HANDLER JS
import {  buildDropDown } from "./site.js";
import { events } from "./events.js";
import { validateForm } from "./validation.js";

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

export function displayData() {
    const template = document.getElementById("eventData-template");
    const eventBody = document.getElementById("eventBody");
    eventBody.innerHTML = "";

    const curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];
    if (curEvents.length === 0) {
        localStorage.setItem("eventsArray", JSON.stringify(events));
        curEvents.push(...events);
    }
    curEvents.forEach((e) => {
        const eventRow = document.importNode(template.content, true);
        const eventCols = eventRow.querySelectorAll("td");
        eventCols[0].textContent = e.event;
        eventCols[1].textContent = e.city;
        eventCols[2].textContent = e.state;
        eventCols[3].textContent = e.attendance;
        eventCols[4].textContent = new Date(e.date).toLocaleDateString();
        eventBody.appendChild(eventRow);
    });
}


// Save data to localStorage
export function saveData() {
  if (!validateForm()) {
    console.log("Form validation failed.");
    return; // Stop saving if validation fails
  }

  const curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];
  const obj = {
    event: document.getElementById("newEventName").value,
    city: document.getElementById("newEventCity").value,
    state:
      document.getElementById("newEventState").options[
        document.getElementById("newEventState").selectedIndex
      ].text,
    attendance: parseInt(
      document.getElementById("newEventAttendance").value,
      10
    ),
    date: new Date(
      document.getElementById("newEventDate").value + "T00:00"
    ).toLocaleString(),
  };

  curEvents.push(obj);
  localStorage.setItem("eventsArray", JSON.stringify(curEvents));
  buildDropDown();
  displayData();
  alert("Event saved successfully!");
  clearFormFields();
}
export function clearFormFields() {
  document.getElementById("newEventName").value = "";
  document.getElementById("newEventCity").value = "";
  document.getElementById("newEventState").value = "";
  document.getElementById("newEventAttendance").value = "";
  document.getElementById("newEventDate").value = "";
}
//======MODAL SECTION====-
export const addDataModalTemplate = `
<div class="modal" id="addData">
        <div class="modal-dialog">
            <div class="modal-content">
                 <div class="modal-header">
                    <h4 class="modal-title logoFont">ADD A NEW EVENT</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <!--MOdal Body-->
                <div class="modal-body">
                    <form id="newEventForm">
                        <div class="form-group">
                            <label for="newEventName" class="form-label">Event Name</label>
                            <input id="newEventName" type="text" class="form-control" >
                            <div id="newEventNameError" class="text-danger"></div>
                        </div>
                        <div class="form-group">
                            <label for="newEventCity" class="form-label">Event City</label>
                            <input id="newEventCity" type="text" class="form-control" >
                            <div id="newEventCityError" class="text-danger"></div>
                        </div>

                        <div class="form-group">
                            <label for="newEventState" class="form-label"> Event State</label>
                            <select class="form-control" id="newEventState">
                               <!-- Options populated by JavaScript -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newEventAttendance" class="form-label">Event Attendance</label>
                            <input id="newEventAttendance" type="text" class="form-control">
                            <div id="newEventAttendanceError" class="text-danger"></div>
                        </div>
                        <div class="form-group">
                            <label for="newEventDate" class="form-label">Event Date</label>
                            <input id="newEventDate" type="date" class="form-control" >
                            <div id="newEventDateError" class="text-danger"></div>
                        </div>

                    </form>
                </div>
                <!--MODAL FOOTER-->
                <div class="modal-footer">
                    <button type="button" id="btnSaveData" class="btn btn-primary" data-bs-dismiss="modal">SAVE</button>
                    <button type="button" id="btnClear" class="btn btn-danger" data-bs-dismiss="modal">CLEAR</button>
                </div>
            </div>
        </div>
    </div>
`;

