const layout = document.querySelector('body');
const checkbox = document.getElementById("checkbox");
const box = document.querySelector(".checkbox-label");
const ball = document.querySelector(".ball");
const moon = document.querySelector(".bi-moon-stars");
const sun = document.querySelector(".bi-sun");
const logo = document.querySelector(".logo");

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to apply the theme based on cookie
function applyTheme(theme) {
    if (theme === "dark") {
        layout.setAttribute("data-bs-theme", "dark");
        logo.setAttribute("src", "logodark.jpg");
        box.style.backgroundColor = "#fff";
        ball.style.backgroundColor = "#111";
        moon.style.color = "#111";
        sun.style.color = "#111";
        checkbox.checked = true;  // Set checkbox to checked
    } else {
        layout.setAttribute("data-bs-theme", "light");
        logo.setAttribute("src", "logo.jpeg");
        box.style.backgroundColor = "#111";
        ball.style.backgroundColor = "#fff";
        moon.style.color = "#fff";
        sun.style.color = "#fff";
        checkbox.checked = false; // Set checkbox to unchecked
    }
}

// Function to initialize the cookie consent modal
const initializeCookieConsent = () => {
    // Check if the cookie consent has already been given or rejected
    if (getCookie("cookieConsent") === "accepted") {
        // Apply the theme based on the cookie
        const theme = getCookie('theme');
        if (theme) {
            applyTheme(theme);
        } else {
            applyTheme('light'); // Default to light theme if no theme cookie is set
        }
    } else if (getCookie("cookieConsent") === "rejected") {
        // No theme application if consent is rejected
        layout.removeAttribute("data-bs-theme");
        box.style.backgroundColor = "";
        ball.style.backgroundColor = "";
        moon.style.color = "";
        sun.style.color = "";
        checkbox.checked = false; // Make sure checkbox is unchecked
    } else {
        // Show the cookie consent modal if no cookie is set
        const cookieModal = new bootstrap.Modal(document.getElementById('cookieconsent2'));
        cookieModal.show();
    }
}

// Event listener for button clicks in the modal
document.addEventListener("DOMContentLoaded", () => {
    initializeCookieConsent();
});

// Event listener for checkbox change
checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        applyTheme('dark');
        setCookie('theme', 'dark', 30); // Save preference for 365 days
    } else {
        applyTheme('light');
        setCookie('theme', 'light', 30); // Save preference for 365 days
    }
});

// Handle modal button clicks
document.getElementById('acceptBtn').addEventListener('click', () => {
    setCookie("cookieConsent", "accepted", 30); // Set consent cookie for 30 days
    const cookieModal = bootstrap.Modal.getInstance(document.getElementById('cookieconsent2'));
    if (cookieModal) {
        cookieModal.hide(); // Hide modal after acceptance
    }
});

document.getElementById('rejectBtn').addEventListener('click', () => {
    setCookie("cookieConsent", "rejected", 30); // Set rejection cookie for 30 days
    const cookieModal = bootstrap.Modal.getInstance(document.getElementById('cookieconsent2'));
    if (cookieModal) {
        cookieModal.hide(); // Hide modal after rejection
    }
});
