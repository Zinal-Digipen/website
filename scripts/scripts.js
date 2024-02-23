// Get a reference to the button and output element
const button = document.getElementById('myButton'); // Get reference to the button element
const output = document.getElementById('output'); // Get reference to the output element

// Function to handle button click event
function handleClick() {
    // Print text to the screen
    output.textContent = 'Button clicked!'; // Set the output element's text content to 'Button clicked!'
}

// Add click event listener to the button
button.addEventListener('click', handleClick); // Add a click event listener to the button element, calling the handleClick function