// validation.js
// Validate Event Name
export function validateEventName(eventName) {
    if (!eventName) {
      alert("Event name is required.");
      return false;
    }
    if (eventName.length < 2 || eventName.length > 75) {
      alert("Event name must be between 2 and 75 characters.");
      return false;
    }
    return true;
  }
  
  // Validate Event City
  export function validateEventCity(eventCity) {
    if (!eventCity) {
      alert("Event city is required.");
      return false;
    }
    if (eventCity.length < 2 || eventCity.length > 50) {
      alert("Event city name must be between 2 and 50 characters.");
      return false;
    }
    return true;
  }
  
  // Validate Event Attendance
  export function validateEventAttendance(eventAttendance) {
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
    if (eventAttendance.length < 1 || eventAttendance.length > 7) {
      alert("Event attendance must be between 1 and 7 digits.");
      return false;
    }
    return true;
  }
  
  // Validate Event Date
  export function validateEventDate(eventDate) {
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
  
  // Validation Checks
  export function validationChecks(eventName, eventCity, eventAttendance, eventDate) {
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
  
  // Validation onBlur
  export function addOnBlurValidation() {
    const eventNameInput = document.getElementById("newEventName");
    const eventCityInput = document.getElementById("newEventCity");
    const eventAttendanceInput = document.getElementById("newEventAttendance");
    const eventDateInput = document.getElementById("newEventDate");
  
    eventNameInput.addEventListener("blur", () => {
      const errorContainer = document.getElementById("newEventNameError");
      const isValid = validateEventName(eventNameInput.value.trim());
      errorContainer.textContent = isValid ? "" : "Event name is invalid.";
    });
  
    eventCityInput.addEventListener("blur", () => {
      const errorContainer = document.getElementById("newEventCityError");
      const isValid = validateEventCity(eventCityInput.value.trim());
      errorContainer.textContent = isValid ? "" : "Event city is invalid.";
    });
  
    eventAttendanceInput.addEventListener("blur", () => {
      const errorContainer = document.getElementById("newEventAttendanceError");
      const isValid = validateEventAttendance(eventAttendanceInput.value.trim());
      errorContainer.textContent = isValid ? "" : "Event attendance is invalid.";
    });
  
    eventDateInput.addEventListener("blur", () => {
      const errorContainer = document.getElementById("newEventDateError");
      const isValid = validateEventDate(eventDateInput.value);
      errorContainer.textContent = isValid ? "" : "Event date is invalid.";
    });
  }
  