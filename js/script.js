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