/*==========================================================*
 * ATP COUNSELLING & COACHING
 * VERSION 3.0
 * MAIN JAVASCRIPT
 *==========================================================*/

"use strict";

/*==========================================================*
 * APPLICATION INITIALISATION
 *==========================================================*/

document.addEventListener("DOMContentLoaded", initialiseWebsite, {
    once: true
});

/*==========================================================*
 * WEBSITE INITIALISATION
 *==========================================================*/

function initialiseWebsite() {

    initialiseNavbar();
    initialiseEnquiryForms();

}

/*==========================================================*
 * NAVBAR
 *==========================================================*/

function initialiseNavbar() {

    const navbar = document.querySelector(".custom-navbar");

    if (!navbar) return;

    let isScrolled = false;

    const updateNavbarState = () => {

        const shouldBeScrolled = window.scrollY > 50;

        // Prevent unnecessary DOM updates
        if (shouldBeScrolled === isScrolled) return;

        isScrolled = shouldBeScrolled;

        navbar.classList.toggle("scrolled", shouldBeScrolled);

    };

    // Set initial state
    updateNavbarState();

    // Update while scrolling
    window.addEventListener("scroll", updateNavbarState, {
        passive: true
    });

}

/*==========================================================*
 * ENQUIRY FORMS
 * Keeps the contact journey concise, privacy-conscious, and
 * usable with native browser validation.
 *==========================================================*/

function initialiseEnquiryForms() {

    const forms = document.querySelectorAll("[data-enquiry-form]");

    forms.forEach((form, index) => {

        const message = form.querySelector("textarea[name='message']");
        const submitButton = form.querySelector("button[type='submit']");
        const referenceId = `enquiry-guidance-${index + 1}`;

        const guidance = document.createElement("p");
        guidance.id = referenceId;
        guidance.className = "form-guidance";
        guidance.textContent = "Please share only a brief, non-sensitive summary. Do not include medical history, diagnosis details, or other confidential information in this form.";

        if (message) {
            message.maxLength = 1000;
            message.setAttribute("aria-describedby", referenceId);
            message.insertAdjacentElement("afterend", guidance);
        }

        const honeypot = document.createElement("div");
        honeypot.className = "form-honeypot";
        honeypot.setAttribute("aria-hidden", "true");
        honeypot.innerHTML = '<label for="website">Leave this field blank</label><input id="website" name="_honey" type="text" tabindex="-1" autocomplete="off">';
        form.prepend(honeypot);

        const privacyCheckbox = form.querySelector("#privacy");
        if (privacyCheckbox) {
            privacyCheckbox.setAttribute("aria-describedby", "privacy-notice");
            const privacyNotice = document.createElement("p");
            privacyNotice.id = "privacy-notice";
            privacyNotice.className = "form-guidance";
            privacyNotice.innerHTML = 'Read our <a href="privacy.html">Privacy Policy</a> to understand how your enquiry is handled.';
            privacyCheckbox.closest(".form-check").insertAdjacentElement("afterend", privacyNotice);
        } else if (submitButton) {
            const consentId = `privacy-consent-${index + 1}`;
            const consent = document.createElement("div");
            consent.className = "form-check mb-4";
            consent.innerHTML = `<input class="form-check-input" type="checkbox" id="${consentId}" required><label class="form-check-label" for="${consentId}">I understand that my information will only be used to respond to my enquiry, as described in the <a href="privacy.html">Privacy Policy</a>.</label>`;
            submitButton.parentElement.insertAdjacentElement("beforebegin", consent);
        }

        form.addEventListener("submit", () => {
            if (!form.checkValidity() || !submitButton) return;

            submitButton.disabled = true;
            submitButton.setAttribute("aria-busy", "true");
            submitButton.textContent = "Sending enquiry…";
        });

    });

}
