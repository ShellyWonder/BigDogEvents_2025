//FORM HANDLER JS
import { displayData, buildDropDown } from "./site.js";
// Form validation function
export function validateForm() {
  const eventName = document.getElementById("newEventName").value.trim();
  const eventCity = document.getElementById("newEventCity").value.trim();
  const eventAttendance = document
    .getElementById("newEventAttendance")
    .value.trim();
  const eventDate = document.getElementById("newEventDate").value;
// Stop validation if any function fails
if (
    !validateEventName(eventName) ||
    !validateEventCity(eventCity) ||
    !validateEventAttendance(eventAttendance) ||
    !validateEventDate(eventDate)
  ) {
    return false;
  }

  return true; // All validations passed
}

// Save data to localStorage
export function saveData() {
  if (!validateForm()) return;

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
function clearFormFields() {
  document.getElementById("newEventName").value = "";
  document.getElementById("newEventCity").value = "";
  document.getElementById("newEventState").selectedIndex = 0; // Reset to first option
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
                            <input id="newEventName" type="text" class="form-control" placeholder="Event Name">
                        </div>
                        <div class="form-group">
                            <label for="newEventCity" class="form-label">Event City</label>
                            <input id="newEventCity" type="text" class="form-control" placeholder="Event City">
                        </div>

                        <div class="form-group">
                            <label for="newEventState" class="form-label"> Event State</label>
                            <select class="form-control placeholder-option" id="newEventState">
                               <!-- Options populated by JavaScript -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newEventAttendance" class="form-label">Event Attendance</label>
                            <input id="newEventAttendance" type="text" class="form-control" placeholder="Event Attendance">
                        </div>
                        <div class="form-group">
                            <label for="newEventDate" class="form-label">Event Date</label>
                            <input id="newEventDate" type="date" class="form-control placeholder-option" placeholder="Event Date">
                        </div>

                    </form>
                </div>
                <!--MODAL FOOTER-->
                <div class="modal-footer">
                    <button type="button" id="btnSaveData" class="btn btn-primary" data-dismiss="modal">SAVE</button>
                </div>
            </div>
        </div>
    </div>
`;
function validateEventName(eventName) {
    if (!eventName) {
      alert("Event name is required.");
      return false;
    }
    if (eventName.length > 75) {
      alert("Event name must not exceed 75 characters.");
      return false;
    }
  }
  // Validate Event City
  function validateEventCity(eventCity) {
    if (!eventCity) {
      alert("Event city is required.");
      return false;
    }
    if (eventCity.length > 50) {
      alert("Event city must not exceed 50 characters.");
      return false;
    }
  }
  // Validate Event Attendance
  function validateEventAttendance(eventAttendance) {
    if (!eventAttendance) {
      alert("Event attendance is required.");
      return false;
    }
    if (isNaN(eventAttendance)) {
      alert("Event attendance must be a valid number.");
      return false;
    }
    if (parseInt(eventAttendance, 10) <= 0) {
      alert("Event attendance must be a positive number.");
      return false;
    }
    if (eventAttendance.length > 7) {
      alert("Event attendance must not exceed 7 digits.");
      return false;
    }
  }
  
  function validateEventDate(eventDate) {
    // Validate Event Date
    if (!eventDate) {
      alert("Event date is required.");
      return false;
    }
    const today = new Date();
    const selectedDate = new Date(eventDate);
  
    // Ensure the date is in the past
    if (selectedDate >= today) {
      alert("Event date cannot be in the future.");
      return false;
    }
  
    return true;
  }