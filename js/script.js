/* Color Scheme */
let isDark = false; 

/* Lista de destaques (fake database) */
// import { highlights } from "./highlights";

function changeColorScheme() {
    document.body.classList.toggle('dark');
    isDark = !isDark;

    localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* Button Change Colors Schema */
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('theme') === 'dark')
        changeColorScheme();

    const changeColorsButton = document.querySelector('#change-color-button');

    changeColorsButton.addEventListener('click', () => changeColorScheme());
})