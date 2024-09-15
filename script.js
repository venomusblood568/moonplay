const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const textBox = document.getElementById('text-box');

// Dark Mode Styles
function darkMode() {
  nav.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  textBox.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
  toggleIcon.children[0].textContent = 'Dark Mode';
  toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
}

// Light Mode Styles
function lightMode() {
  nav.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
  textBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  toggleIcon.children[0].textContent = 'Light Mode';
  toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
}

// Switch Theme Dynamically
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    darkMode();
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    lightMode();
  }
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    darkMode();
  } else {
    lightMode();
  }
}

// Loading Screen JS

// Replace this URL with the image URL you want to fetch
const imageUrl = "https://i.pinimg.com/originals/9b/24/47/9b244754a9046dfa4bbe01f79354f351.gif"

// Get a reference to the image element
const imageElement = document.getElementById("loading-image");

// Set the image source to the specified URL
imageElement.src = imageUrl;

// JavaScript to hide the loading screen after 3 seconds (or the length of the gif)
window.onload = function () {
  setTimeout(function () {
    document.querySelector('.loading-container').style.display = 'none';
    // Make sure content is visible after hiding the loader
    document.querySelector('.content').style.display = 'block';
    // Create and append the "Begin" button
    const beginButton = document.createElement("button");
    beginButton.className = "start-button";
    beginButton.textContent = "Load the project's";
    beginButton.onclick = beginAnimation;
    document.body.appendChild(beginButton);
  }, 3000); // Adjust this duration as needed to match the length of the gif
};
