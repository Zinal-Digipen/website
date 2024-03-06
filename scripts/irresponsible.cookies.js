// irresponsible.cookies.js

// Function to fetch the user's IP address
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

// Function to fetch the user's geolocation based on IP address
async function getGeolocation(ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        return {
            country: data.country_name,
            region: data.region,
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude
        };
    } catch (error) {
        console.error('Error fetching geolocation:', error);
        return null;
    }
}

// Function to gather system information
function getSystemInformation() {
    const systemInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookiesEnabled: navigator.cookieEnabled,
        // You can add more system information here, but be mindful of privacy concerns
    };
    return systemInfo;
}

// Function to log user and system information and store as a file
async function logUserInfo() {
    const ipAddress = await getIPAddress();
    if (!ipAddress) return;

    const geolocationData = await getGeolocation(ipAddress);
    if (!geolocationData) return;

    const userInfo = {
        ipAddress,
        geolocation: {
            country: geolocationData.country,
            region: geolocationData.region,
            city: geolocationData.city,
            latitude: geolocationData.latitude,
            longitude: geolocationData.longitude
        },
        systemInfo: getSystemInformation()
    };

    // Convert user information to JSON
    const userInfoJSON = JSON.stringify(userInfo, null, 2);

    // Create a Blob containing the user information
    const blob = new Blob([userInfoJSON], { type: 'application/json' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'user.logs';

    // Trigger the download
    link.click();
}

// Call the function to log user information when the page loads
window.onload = function () {
    logUserInfo();
};