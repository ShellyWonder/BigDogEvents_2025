//FORM HANDLER JS

// Form validation function
export function validateForm() {
    const eventName = document.getElementById("newEventName").value.trim();
    const eventCity = document.getElementById("newEventCity").value.trim();
    const eventAttendance = document.getElementById("newEventAttendance").value;
    const eventDate = document.getElementById("newEventDate").value;

    if (!eventName || !eventCity || isNaN(eventAttendance) || !eventDate) {
        alert("All fields are required and attendance must be a valid number.");
        return false;
    }
    return true;
}

// Save data to localStorage
export function saveData() {
    if (!validateForm()) return;

    const curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];
    const obj = {
        event: document.getElementById("newEventName").value,
        city: document.getElementById("newEventCity").value,
        state: document.getElementById("newEventState").options[
            document.getElementById("newEventState").selectedIndex
        ].text,
        attendance: parseInt(document.getElementById("newEventAttendance").value, 10),
        date: new Date(document.getElementById("newEventDate").value + "T00:00").toLocaleString(),
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
                <!--modal header goes here-->
                <div class="modal-header">
                    <h4 class="modal-title">Add a New Event</h4>
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
                            <select class="form-control" id="newEventState">
                                <!-- Options populated by JavaScript -->
                            </select>
                            
                        </div>
                        <div class="form-group">
                            <label for="newEventAttendance" class="form-label">Event Attendance</label>
                            <input id="newEventAttendance" type="text" class="form-control"
                                placeholder="Event Attendance">
                        </div>
                        <div class="form-group">
                            <label for="newEventDate" class="form-label">Event Date</label>
                            <input id="newEventDate" type="date" class="form-control" placeholder="Event Date">
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


