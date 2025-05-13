// DOM Elements
const colorButtons = document.querySelectorAll('.color-btn');
const animationTrigger = document.getElementById('trigger-animation');
const animatedElement = document.querySelector('.animated-element');

// Theme Preferences using localStorage
function setTheme(themeName) {
    // Remove all theme classes
    document.body.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
    
    // Add the selected theme class
    if (themeName) {
        document.body.classList.add(`theme-${themeName}`);
    }
    
    // Save to localStorage
    localStorage.setItem('preferredTheme', themeName);
}

// Function to get theme from localStorage
function getTheme() {
    return localStorage.getItem('preferredTheme') || 'blue'; // Default to blue
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    // Apply the saved theme
    const savedTheme = getTheme();
    setTheme(savedTheme);
    
    // Log the current theme
    console.log(`Theme loaded from localStorage: ${savedTheme}`);
    
    // Add active class to the current theme button
    const activeButton = document.querySelector(`.color-btn[data-color="${savedTheme}"]`);
    if (activeButton) {
        activeButton.style.outline = `3px solid #333`;
    }
});

// Event listeners for theme buttons
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedTheme = button.getAttribute('data-color');
        
        // Remove outline from all buttons
        colorButtons.forEach(btn => {
            btn.style.outline = 'none';
        });
        
        // Add outline to selected button
        button.style.outline = `3px solid #333`;
        
        // Set the theme
        setTheme(selectedTheme);
        
        // Trigger a small animation on the button
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = '';
        }, 300);
    });
});

// Animation trigger
animationTrigger.addEventListener('click', () => {
    // Reset the animation by removing and re-adding the class
    animatedElement.classList.remove('animate');
    
    // Force a reflow to restart the animation
    void animatedElement.offsetWidth;
    
    // Add the animation class
    animatedElement.classList.add('animate');
    
    // Store the last animation time in localStorage
    const now = new Date();
    localStorage.setItem('lastAnimationTime', now.toString());
    
    // Update the button text temporarily
    const originalText = animationTrigger.textContent;
    animationTrigger.textContent = 'Animation Triggered!';
    
    setTimeout(() => {
        animationTrigger.textContent = originalText;
    }, 2000);
});

// Display last animation time if available
function displayLastAnimationTime() {
    const lastTime = localStorage.getItem('lastAnimationTime');
    
    if (lastTime) {
        console.log(`Last animation was triggered on: ${lastTime}`);
    }
}

// Call this function on page load
displayLastAnimationTime();

// Advanced function: Create a custom animation based on user interaction
function createCustomAnimation(element, properties) {
    // Store animation preferences
    localStorage.setItem('customAnimation', JSON.stringify(properties));
    
    // Apply the animation
    Object.keys(properties).forEach(prop => {
        element.style[prop] = properties[prop];
    });
}


document.querySelectorAll('.transition-box').forEach(box => {
    box.addEventListener('click', function() {
        // Create a random color
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        
        // Custom animation properties
        const animProps = {
            backgroundColor: randomColor,
            transform: 'scale(1.2) rotate(15deg)'
        };
        
        // Apply custom animation
        createCustomAnimation(this, animProps);
        
        // Reset after animation
        setTimeout(() => {
            this.style.transform = '';
            // Don't reset background color to keep the new color
        }, 1000);
    });
});
