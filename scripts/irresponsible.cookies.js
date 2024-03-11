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
        const response = await fetch(`https://ipapi.co/json/`);
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

// Function to display user information
async function displayUserInfo() {
    const ipAddress = await getIPAddress();
    const geolocation = await getGeolocation(ipAddress);

    if (ipAddress && geolocation) {
        document.getElementById('ip-address').textContent = ipAddress;
        document.getElementById('country').textContent = geolocation.country;
        document.getElementById('region').textContent = geolocation.region;
        document.getElementById('city').textContent = geolocation.city;
        document.getElementById('latitude').textContent = geolocation.latitude;
        document.getElementById('longitude').textContent = geolocation.longitude;
    } else {
        document.getElementById('user-info').innerHTML = '<p>Error fetching user information. Please try again later.</p>';
    }
}

// Call the function to display user information
displayUserInfo();

/**
 * Retrieves extensive system information
 * @returns {object} The extensive system information
 */
function getSystemInformation() {
    const systemInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        appVersion: navigator.appVersion,
        appName: navigator.appName,
        appCodeName: navigator.appCodeName,
        product: navigator.product,
        productSub: navigator.productSub,
        vendor: navigator.vendor,
        vendorSub: navigator.vendorSub,
        cookiesEnabled: navigator.cookieEnabled,
        screen: {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth
        },
        deviceMemory: navigator.deviceMemory,
        hardwareConcurrency: navigator.hardwareConcurrency,
        maxTouchPoints: navigator.maxTouchPoints,
        mediaDevices: navigator.mediaDevices,
        permissions: navigator.permissions,
        plugins: Array.from(navigator.plugins).map(plugin => ({
            name: plugin.name,
            filename: plugin.filename,
            description: plugin.description
        })),
        doNotTrack: navigator.doNotTrack,
        geolocation: navigator.geolocation,
        connection: navigator.connection,
        battery: navigator.getBattery(),
        networkInformation: navigator.connection,
        device: {
            platform: navigator.platform,
            appCodeName: navigator.appCodeName,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            userAgent: navigator.userAgent
        },
        time: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            datetime: new Date().toString()
        },
        // Additional system information
        cookies: document.cookie,
        localStorage: window.localStorage,
        sessionStorage: window.sessionStorage,
        webRTC: navigator.mediaDevices.getUserMedia,
        webGL: document.createElement('canvas').getContext('webgl'),
        webAudio: window.AudioContext || window.webkitAudioContext,
        hardwareConcurrency: navigator.hardwareConcurrency,
        language: navigator.language,
        devicePixelRatio: window.devicePixelRatio,
        platform: navigator.platform,
        plugins: Array.from(navigator.plugins).map(({ name }) => name),
        userAgent: navigator.userAgent,
        systemFonts: getSystemFonts(),
        systemColors: getSystemColors(),
        systemAudio: getAudioDevices()
    };
    return systemInfo;
}
// Function to log user and system information and send to server
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

    // Send user information to server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/log', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('User information logged successfully.');
            } else {
                console.error('Failed to log user information.');
            }
        }
    };
    xhr.send(JSON.stringify(userInfo));
}

// Call the function to log user information when the page loads
window.onload = function () {
    logUserInfo();
};
