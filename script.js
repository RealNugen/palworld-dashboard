// Function to fetch telemetry data from the Flask API via Cloudflare Tunnel
async function fetchSystemStats() {
    try {
        const response = await fetch('https://api.nugen.cc/api/stats');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        updateDashboardUI(data);
    } catch (error) {
        console.error('Error fetching system stats:', error);
        showOfflineStatus();
    }
}

// Function to update UI elements with telemetry data
function updateDashboardUI(data) {
    // Uptime
    if (data.uptime) {
        document.getElementById('uptime-value').innerText = data.uptime;
    }

    // CPU Load
    if (data.cpu_load !== undefined) {
        document.getElementById('cpu-value').innerText = `${data.cpu_load}%`;
    }

    // RAM Usage
    if (data.memory) {
        document.getElementById('ram-value').innerText = `${data.memory.used_gb} / ${data.memory.total_gb} GB (${data.memory.percent}%)`;
    }

    // Disk Usage
    if (data.disk) {
        document.getElementById('disk-value').innerText = `${data.disk.used_gb} / ${data.disk.total_gb} GB (${data.disk.percent}%)`;
    }

    // CPU Temperature
    if (data.temperature !== undefined) {
        document.getElementById('temp-value').innerText = `${data.temperature} °C`;
    }
}

// Function to handle connection errors visually
function showOfflineStatus() {
    const offlineText = 'Offline / Error';
    document.getElementById('cpu-value').innerText = offlineText;
    document.getElementById('ram-value').innerText = offlineText;
    document.getElementById('disk-value').innerText = offlineText;
    document.getElementById('temp-value').innerText = offlineText;
}

// Auto-refresh stats every 5 seconds
setInterval(fetchSystemStats, 5000);

// Initial fetch on page load
fetchSystemStats();
