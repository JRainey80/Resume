document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://resumeapiapp.azurewebsites.net';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const apiKey = data.apiKey;
            const apiUrlWithKey = `https://resumeapiapp.azurewebsites.net/api/api_trig?code=${apiKey}`;

            fetch(apiUrlWithKey)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    document.getElementById('count').textContent = data.count;
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                    document.getElementById('count').textContent = 'Unavailable';
                });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('count').textContent = 'Unavailable';
        });
});

