// validation.js
// Form validation function
export function validateField(value, rules) {
  for (let rule of rules) {
    if (!rule.check(value)) {
      return { isValid: false, message: rule.message };
    }
  }
  return { isValid: true };
}

// Validation rules
const rules = {
  eventName: [
    { check: (val) => !!val, message: "Event name is required." },
    { check: (val) => val.length >= 2 && val.length <= 75, message: "Event name must be between 2 and 75 characters." }
  ],
  eventCity: [
    { check: (val) => !!val, message: "Event city is required." },
    { check: (val) => val.length >= 2 && val.length <= 50, message: "Event city must be between 2 and 50 characters." }
  ],
  eventAttendance: [
    { check: (val) => !!val, message: "Event attendance is required." },
    { check: (val) => !isNaN(val), message: "Event attendance must be a number." },
    { check: (val) => parseInt(val, 10) > 0, message: "Event attendance must be positive." },
    { check: (val) => val.length >= 1 && val.length <= 7, message: "Event attendance must be between 1 and 7 digits." }
  ],
  eventDate: [
    { check: (val) => !!val, message: "Event date is required." },
    { check: (val) => new Date(val) < new Date(), message: "Event date cannot be in the future." }
  ]
};

export function validateForm() {
  const fields = [
    { id: "newEventName", rules: rules.eventName },
    { id: "newEventCity", rules: rules.eventCity },
    { id: "newEventAttendance", rules: rules.eventAttendance },
    { id: "newEventDate", rules: rules.eventDate }
  ];

  let isValid = true;
  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const errorContainer = document.getElementById(`${field.id}Error`);
    const result = validateField(input.value.trim(), field.rules);
    if (!result.isValid) {
      errorContainer.textContent = result.message;
      isValid = false;
    } else {
      errorContainer.textContent = "";
    }
  });

  return isValid;
}

// Define individual field validators
export function validateEventName(value) {
  const rules = [
    { check: (val) => !!val, message: "Event name is required." },
    { check: (val) => val.length >= 2 && val.length <= 75, message: "Event name must be between 2 and 75 characters." }
  ];
  return validateField(value, rules).isValid;
}

export function validateEventCity(value) {
  const rules = [
    { check: (val) => !!val, message: "Event city is required." },
    { check: (val) => val.length >= 2 && val.length <= 50, message: "Event city must be between 2 and 50 characters." }
  ];
  return validateField(value, rules).isValid;
}

export function validateEventAttendance(value) {
  const rules = [
    { check: (val) => !!val, message: "Event attendance is required." },
    { check: (val) => !isNaN(val), message: "Event attendance must be a number." },
    { check: (val) => parseInt(val, 10) > 0, message: "Event attendance must be positive." },
    { check: (val) => val.length >= 1 && val.length <= 7, message: "Event attendance must be between 1 and 7 digits." }
  ];
  return validateField(value, rules).isValid;
}

export function validateEventDate(value) {
  const rules = [
    { check: (val) => !!val, message: "Event date is required." },
    { check: (val) => new Date(val) < new Date(), message: "Event date cannot be in the future." }
  ];
  return validateField(value, rules).isValid;
}

  
  
export function addFocusOutValidation(validateEventName, validateEventCity, validateEventAttendance, validateEventDate) {
  const fields = [
      { inputId: "newEventName", errorId: "newEventNameError", validator: validateEventName, errorMessage: "Event name is invalid." },
      { inputId: "newEventCity", errorId: "newEventCityError", validator: validateEventCity, errorMessage: "Event city is invalid." },
      { inputId: "newEventAttendance", errorId: "newEventAttendanceError", validator: validateEventAttendance, errorMessage: "Event attendance is invalid." },
      { inputId: "newEventDate", errorId: "newEventDateError", validator: validateEventDate, errorMessage: "Event date is invalid." }
  ];

  fields.forEach(({ inputId, errorId, validator, errorMessage }) => {
      const input = document.getElementById(inputId);
      const errorContainer = document.getElementById(errorId);

      if (input && errorContainer) {
          input.addEventListener("focusout", (event) => {
              const value = input.value.trim();
              const isValid = validator(value);

              if (isValid) {
                  errorContainer.textContent = ""; // Clear the error message
              } else {
                  event.preventDefault(); // Prevent the focus from moving
                  errorContainer.textContent = errorMessage; // Display the error message
                  input.value = ""; // Clear the input field
                  input.focus(); // Refocus the invalid field
              }
          });
      }
  });
}



  