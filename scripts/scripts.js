// Get a reference to the button and output element
const button = document.getElementById('myButton');
const output = document.getElementById('output');

// Function to handle button click event
function handleClick() {
    // Print text to the screen
    output.textContent = 'Button clicked!';
}

// Add click event listener to the button
button.addEventListener('click', handleClick);