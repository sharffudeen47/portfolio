(function () {
    // Footer year
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    // Active nav highlighting
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-item").forEach(a => {
        const href = (a.getAttribute("href") || "").toLowerCase();
        if (href === path) a.classList.add("active");
    });

    // Mobile nav toggle
    const toggle = document.querySelector(".nav-toggle");
    const panel = document.getElementById("mobilePanel");

    function closeMenu(){
        if (!panel) return;
        panel.classList.remove("open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    if (toggle && panel) {
        toggle.addEventListener("click", () => {
            const isOpen = panel.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            const t = e.target;
            const clickedInside = panel.contains(t) || toggle.contains(t);
            if (!clickedInside) closeMenu();
        });

        // Close on escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeMenu();
        });

        // Close on link click
        panel.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }
})();

(function () {
    // Footer year
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    // Active nav highlighting
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-item").forEach(a => {
        const href = (a.getAttribute("href") || "").toLowerCase();
        if (href === path) a.classList.add("active");
    });

    // Mobile nav toggle
    const toggle = document.querySelector(".nav-toggle");
    const panel = document.getElementById("mobilePanel");

    function closeMenu(){
        if (!panel) return;
        panel.classList.remove("open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    if (toggle && panel) {
        toggle.addEventListener("click", () => {
            const isOpen = panel.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        document.addEventListener("click", (e) => {
            const t = e.target;
            const clickedInside = panel.contains(t) || toggle.contains(t);
            if (!clickedInside) closeMenu();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeMenu();
        });

        panel.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

    // Contact form -> mailto (works on GitHub Pages)
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name")?.value?.trim() || "";
            const email = document.getElementById("email")?.value?.trim() || "";
            const subject = document.getElementById("subject")?.value?.trim() || "";
            const message = document.getElementById("message")?.value?.trim() || "";

            const to = "sharffudeen@hotmail.com";
            const body =
                `Name: ${name}
Email: ${email}

${message}`;

            const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailto;
        });
    }
})();

