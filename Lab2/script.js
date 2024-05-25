function sendLocationToServer(latitude, longitude) {
    const data = { latitude: latitude, longitude: longitude };
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            window.location.href = '/weather';
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
            sendLocationToServer(latitude, longitude);
        }, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
    }
}
getLocation();
