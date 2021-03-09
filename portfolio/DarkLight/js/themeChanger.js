const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.querySelector('#toggle-icon');

function darkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.remove('fa-sun');
    toggleIcon.children[1].classList.add('fa-moon');
}

function lightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.remove('fa-moon');
    toggleIcon.children[1].classList.add('fa-sun');
}

function saveThemeLocal(theme) {
    localStorage.setItem('theme', theme);
}

function switchTheme() {
    if(event.target.checked) {
        saveThemeLocal('dark');
        darkMode();
    } else {
        saveThemeLocal('light');
        lightMode();
    }
}

toggleSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        darkMode();
    }
}