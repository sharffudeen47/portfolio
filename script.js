/**
 * Mohamed Nadeem - Portfolio Core Logic
 * Cleaned, optimized, and stabilized.
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. UI Elements ---
    const elements = {
        year: document.getElementById("year"),
        navItems: document.querySelectorAll(".nav-item"),
        navToggle: document.querySelector(".nav-toggle"),
        mobilePanel: document.getElementById("mobilePanel"),
        contactForm: document.getElementById("contactForm")
    };

    // --- 2. Dynamic Footer Year ---
    if (elements.year) {
        elements.year.textContent = new Date().getFullYear();
    }

    // --- 3. Robust Active Navigation Highlighting ---
    // This logic handles root paths, sub-folders, and index files more reliably
    const currentPath = window.location.pathname.toLowerCase();

    elements.navItems.forEach(link => {
        const linkPath = link.getAttribute("href").toLowerCase().replace(/^\.\.\//, ""); // Remove relative path markers

        // Highlight if path matches, or if we are at root and link is index
        if (currentPath.endsWith(linkPath) || (currentPath === "/" && linkPath === "index.html")) {
            link.classList.add("active");
        }
    });

    // --- 4. Mobile Navigation Logic ---
    if (elements.navToggle && elements.mobilePanel) {

        const toggleMenu = (forceClose = false) => {
            const isOpening = forceClose ? false : !elements.mobilePanel.classList.contains("open");

            elements.mobilePanel.classList.toggle("open", isOpening);
            elements.navToggle.setAttribute("aria-expanded", String(isOpening));

            // Prevent background scrolling when menu is open (UX Polish)
            document.body.style.overflow = isOpening ? "hidden" : "";
        };

        elements.navToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close when clicking outside the menu or toggle
        document.addEventListener("click", (e) => {
            if (elements.mobilePanel.classList.contains("open")) {
                const isClickInside = elements.mobilePanel.contains(e.target) || elements.navToggle.contains(e.target);
                if (!isClickInside) toggleMenu(true);
            }
        });

        // Accessibility: Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && elements.mobilePanel.classList.contains("open")) {
                toggleMenu(true);
            }
        });

        // Close menu when a link is clicked (useful for single-page anchors)
        elements.mobilePanel.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => toggleMenu(true));
        });
    }

    // --- 5. Contact Form to Mailto ---
    if (elements.contactForm) {
        elements.contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Get values securely
            const formData = {
                name: document.getElementById("name")?.value?.trim() || "Anonymous",
                email: document.getElementById("email")?.value?.trim() || "No email provided",
                subject: document.getElementById("subject")?.value?.trim() || "Portfolio Inquiry",
                message: document.getElementById("message")?.value?.trim() || ""
            };

            const recipient = "sharffudeen@hotmail.com";
            const bodyContent = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

            // Construct mailto link
            const mailtoUri = `mailto:${recipient}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(bodyContent)}`;

            // UI Feedback: Show the user something happened
            const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Opening Email...';

            // Trigger email client
            window.location.href = mailtoUri;

            // Reset button after a delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                elements.contactForm.reset();
            }, 3000);
        });
    }
});