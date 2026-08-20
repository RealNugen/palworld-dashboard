document.addEventListener('DOMContentLoaded', () => {
    // 1. Menü-Toggle Logik
    const menuButton = document.getElementById('menu-btn') || document.querySelector('.menu-button');
    const menuNav = document.getElementById('dropdown-menu') || document.querySelector('.menu-nav');

    if (menuButton && menuNav) {
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            menuNav.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!menuNav.contains(e.target) && !menuButton.contains(e.target)) {
                menuNav.classList.remove('active');
            }
        });
    }

    // 2. API-Fetch Logik
    async function fetchStats() {
        const statusElement = document.getElementById('connection-status');
        
        try {
            const response = await fetch('https://enviably-saturday-barrette.ngrok-free.dev/api/stats', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (document.getElementById('system-uptime')) document.getElementById('system-uptime').innerText = data.uptime || '--';
            if (document.getElementById('system-load')) document.getElementById('system-load').innerText = data.load || '0.00';
            if (document.getElementById('disk-usage')) document.getElementById('disk-usage').innerText = data.disk || '0 GB';
            if (document.getElementById('memory-usage')) document.getElementById('memory-usage').innerText = data.memory || '0 GB';
            if (document.getElementById('temperature')) document.getElementById('temperature').innerText = data.temp ? `${data.temp} °C` : '-- °C';
            if (document.getElementById('processes')) document.getElementById('processes').innerText = data.processes || '0';
            if (document.getElementById('users-count')) document.getElementById('users-count').innerText = data.users || '0';

            if (statusElement) {
                statusElement.innerText = "PS C:\\SYSTEM> ONLINE";
                statusElement.style.color = "#00ff66";
            }

        } catch (error) {
            console.error('Fetch failure:', error);
            if (statusElement) {
                statusElement.innerText = "PS C:\\SYSTEM> OFFLINE // CONNECTION ERROR";
                statusElement.style.color = "#ff3333";
            }
        }
    }

    fetchStats();
    setInterval(fetchStats, 5000);
});
