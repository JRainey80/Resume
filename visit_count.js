document.addEventListener('DOMContentLoaded', async function () {
    const apiUrl = 'https://resumeapiapp.azurewebsites.net/api/api_trig';
    const cacheKey = 'visitorCount';
    const cacheExpiryKey = 'visitorCountExpiry';
    const rateLimitKey = 'lastApiCall';
    const cacheTTL = 5 * 60 * 1000; // 5 minutes (300,000 ms)
    const rateLimitTTL = 30 * 1000; // Minimum 30 seconds between API calls

    try {
        // Get current time
        const now = Date.now();

        // Check last API call time (Rate limiting)
        const lastApiCall = localStorage.getItem(rateLimitKey);
        if (lastApiCall && now - parseInt(lastApiCall, 10) < rateLimitTTL) {
            console.log('Rate limit active: Skipping API call');
            return;
        }

        // Check cached data
        const cachedData = localStorage.getItem(cacheKey);
        const cachedExpiry = localStorage.getItem(cacheExpiryKey);

        if (cachedData && cachedExpiry && now < parseInt(cachedExpiry, 10)) {
            console.log('Using Cached Data');
            document.getElementById('count').textContent = JSON.parse(cachedData).count;
            return;
        }

        // Fetch from API if cache is expired or doesn't exist
        const response = await fetch(apiUrl);

        console.log('Raw Response:', response);
        if (!response.ok) {
            console.error('Fetch Error (Not OK):', response);
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Parsed Data:', data);

        // Update visitor count on page
        document.getElementById('count').textContent = data.count;

        // Cache the new data and update expiry time
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(cacheExpiryKey, (now + cacheTTL).toString());

        // Update last API call time
        localStorage.setItem(rateLimitKey, now.toString());

    } catch (error) {
        console.error('Fetch Error:', error);
        document.getElementById('count').textContent = 'Unavailable';
    }
});

