export function toggleLogo() {
    const logo = document.querySelector("#logo");

    logo.classList.toggle("fade-in");
    logo.classList.toggle("fade-out");
}

export function createLogo() {
    const logo = document.createElement("img");
    const container = document.createElement("a");

    logo.src = require("../../assets/logo.png");
    
    container.href = "#";
    container.append(logo);
    container.id = "logo";
    container.classList.add("fade-out");

    document.querySelector("#utils").append(container);

    container.addEventListener("click", () => {
       
        if (!document.body.getAttribute("style"))
            document.body.style.cursor = "none !important";
        else
            document.body.removeAttribute("style");
    })
}