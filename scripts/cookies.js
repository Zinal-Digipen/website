// This script gets the user's IP address and generates a log file

// Function to fetch the user's IP address
/**
 * Fetches the user's IP address from the API
 * @returns {string} The user's IP address
 */
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }
}

// Function to generate the content of the log file
/**
 * Generates the content of the log file using the user's IP address
 */
async function generateLogFile() {
    const ipAddress = await getIPAddress();
    if (!ipAddress) return;

    const logContent = `User IP Address: ${ipAddress}\n`;

    // Prompt the user to save the log file
    const blob = new Blob([logContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'ipLogs.txt';
    link.click();
}

// Call the function to generate the log file when the page loads
window.onload = function () {
    generateLogFile();
};