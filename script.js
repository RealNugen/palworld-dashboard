// Funktion zum Abrufen der Server-Daten von der Flask-API
async function fetchStats() {
  const statusText = document.getElementById('status-text');
  
  try {
    const response = await fetch('https://enviably-saturday-barrette.ngrok-free.dev/api/stats', {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });

    if (!response.ok) throw new Error('Netzwerk-Antwort war nicht ok');

    const data = await response.json();

    // DOM-Elemente sicher befüllen
    const uptimeEl = document.getElementById('uptime');
    if (uptimeEl) uptimeEl.innerText = data.uptime || '--';

    const loadEl = document.getElementById('load');
    if (loadEl) loadEl.innerText = data.load || '--';

    const diskEl = document.getElementById('disk');
    if (diskEl) diskEl.innerText = data.disk || '--';

    const memoryEl = document.getElementById('memory');
    if (memoryEl) memoryEl.innerText = data.memory || '--';

    const tempEl = document.getElementById('temp');
    if (tempEl) tempEl.innerText = data.temp ? `${data.temp} °C` : '-- °C';

    const processesEl = document.getElementById('processes');
    if (processesEl) processesEl.innerText = data.processes || '--';

    const usersEl = document.getElementById('users-logged');
    if (usersEl) usersEl.innerText = data.users || '0';

    // Status-Indikator auf ONLINE setzen
    if (statusText) {
      statusText.innerText = 'PS C:\\SYSTEM> ONLINE';
      statusText.style.color = '#00ff66';
    }
  } catch (error) {
    console.error('Fetch failure:', error);
    if (statusText) {
      statusText.innerText = 'PS C:\\SYSTEM> OFFLINE // CONNECTION ERROR';
      statusText.style.color = '#ff3333';
    }
  }
}

// Click-to-Copy Funktion für die Serveradresse im Menü
function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const hint = element.querySelector('.copy-hint');
    const originalText = hint ? hint.innerText : '';

    if (hint) hint.innerText = 'Kopiert!';
    element.classList.add('copied');

    setTimeout(() => {
      if (hint) hint.innerText = originalText;
      element.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Fehler beim Kopieren: ', err);
  });
}

// Menü Toggle Logik
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const menuBox = document.getElementById('menu-box');

  if (menuBtn && menuBox) {
    menuBtn.addEventListener('click', () => {
      menuBox.classList.toggle('hidden');
    });
  }

  // Ersten Fetch ausführen & Intervall auf 5 Sekunden setzen
  fetchStats();
  setInterval(fetchStats, 5000);
});
