const burgerButton = document.getElementById("burger-button")! as HTMLButtonElement;
const burgerNav = document.querySelector(".burger-menu__nav")! as HTMLElement;

burgerButton.addEventListener("click", toggleBurgerMenu)

function toggleBurgerMenu() {
    if (burgerNav.classList.contains("hidden")) {
        burgerNav.classList.remove("hidden")
    } else {
        burgerNav.classList.add("hidden")
    }
}