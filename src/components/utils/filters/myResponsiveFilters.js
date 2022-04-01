function createCloseButton() {
    const button = document.createElement("i");
    button.className = "filter-button fas fa-times-circle fade-out hide";
    button.id = "close-filters"

    document.querySelector("#utils").append(button);

    return button;
}

function createCloseEvent(show, close, filters) {
    close.addEventListener("click", () => {
        toggleFilterButton(close);

        show.classList.remove("hide");

        setTimeout(() => {
            toggleMobileFilters(filters);
            setTimeout(() => {
                toggleFilterButton(show);
                filters.classList.add("hide");
                close.classList.add("hide");
            }, 750);
        }, 250)
    });
}

function createShowButton() {
    const button = document.createElement("img");

    button.src = require("../../../assets/filter.svg");
    button.className = "filter-button fade-out";
    button.id = "show-filters"

    document.querySelector("#utils").append(button);

    return button;
}

function createShowEvent(show, close, filters) {
    show.addEventListener("click", () => {
        toggleFilterButton(show);
        filters.classList.remove("hide");
        close.classList.remove("hide");
        setTimeout(() => {
            toggleMobileFilters(filters);
            setTimeout(() => {
                toggleFilterButton(close);
            }, 750);
            show.classList.add("hide");
        }, 250);
    });
}

function toggleMobileFilters(filters) {
    filters.classList.toggle("filter-init-pos");
    filters.classList.toggle("filter-in");
    filters.classList.toggle("filter-out");
}



export function toggleFilterButton(button) {
    button.classList.toggle("fade-in");
    button.classList.toggle("fade-out");
}

export function createResponsiveFilters() {
    const filterContainer = document.querySelector("#filters-mobile");

    filterContainer.classList.add("hide");
    const closeButton = createCloseButton();
    const showButton = createShowButton();

    createShowEvent(showButton, closeButton, filterContainer);
    createCloseEvent(showButton, closeButton, filterContainer);
    document.querySelector("#utils").append(showButton);
}