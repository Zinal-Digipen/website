function getIPAddress() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip-address').innerText = data.ip;
            getGeolocation(data.ip);
        })
        .catch(error => console.error('Error fetching IP address:', error));
}

function getGeolocation(ip) {
    fetch(`https://ipapi.co/${ip}/json/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('country').innerText = data.country_name;
            document.getElementById('region').innerText = data.region;
            document.getElementById('city').innerText = data.city;
            document.getElementById('latitude').innerText = data.latitude;
            document.getElementById('longitude').innerText = data.longitude;
        })
        .catch(error => console.error('Error fetching geolocation:', error));
}

window.onload = getIPAddress;