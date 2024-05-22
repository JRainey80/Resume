document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://resumeapiapp.azurewebsites.net/api/api_trig?code=mmMcNeqOz_dGPOmPyJxVqoRinVN5TcqaSx2oJbNufVsnAzFuoPFU-g%3D%3D';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('visitorCount').textContent = data.count;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('visitorCount').textContent = 'Unavailable';
        });
});