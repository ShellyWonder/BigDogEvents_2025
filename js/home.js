import { updateCopyrightYear } from "./site.js";
document.addEventListener("DOMContentLoaded", () => {
    // Add the 'animate' class to trigger the effect
    const list = document.querySelector('.fa-ul');
    list.classList.add('animate'); 
    updateCopyrightYear();
  });