(function () {
    // footer year
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    // active nav highlighting
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-item").forEach(a => {
        const href = (a.getAttribute("href") || "").toLowerCase();
        if (href === path) a.classList.add("active");
    });

    // mobile nav toggle
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("nav.nav");
    if (toggle && nav) {
        toggle.addEventListener("click", () => nav.classList.toggle("open"));
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove("open");
        });
    }

    // contact form -> mailto
    const form = document.querySelector("#contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.querySelector("#name")?.value?.trim() || "";
            const email = document.querySelector("#email")?.value?.trim() || "";
            const subject = document.querySelector("#subject")?.value?.trim() || "Portfolio contact";
            const message = document.querySelector("#message")?.value?.trim() || "";

            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            // replace with your email if you want
            const to = "sharffudeen@hotmail.com";
            const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
            window.location.href = url;
        });
    }
})();
