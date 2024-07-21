document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://resumeapiapp.azurewebsites.net/api/api_trig';

    fetch(apiUrl)
        .then(response => {
            console.log('Raw Response:', response);
            if (!response.ok) {
                console.error('Fetch Error (Not OK):', response); 
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Parsed Data:', data); 
            document.getElementById('count').textContent = data.count;
        })
        .catch(error => {
            console.error('Fetch Error:', error); 
            document.getElementById('count').textContent = 'Unavailable';
        });
});