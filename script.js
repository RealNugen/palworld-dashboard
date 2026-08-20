// Funktion zum Abrufen der Server-Daten von der Flask-API
async function fetchStats() {
  try {
    const response = await fetch('https://enviably-saturday-barrette.ngrok-free.dev/api/stats', {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });

    if (!response.ok) throw new Error('Netzwerk-Antwort war nicht ok');

    const data = await response.json();

    // DOM-Elemente befüllen
    document.getElementById('uptime').innerText = data.uptime || '--';
    document.getElementById('load').innerText = data.load || '--';
    document.getElementById('disk').innerText = data.disk || '--';
    document.getElementById('memory').innerText = data.memory || '--';
    document.getElementById('temp').innerText = data.temp ? `${data.temp} °C` : '-- °C';
    document.getElementById('processes').innerText = data.processes || '--';

    // Status-Indikator auf ONLINE setzen
    const statusText = document.getElementById('status-text');
    if (statusText) {
      statusText.innerText = 'PS C:\\SYSTEM> ONLINE';
      statusText.style.color = '#00ff66';
    }
  } catch (error) {
    console.error('Fetch failure:', error);
    const statusText = document.getElementById('status-text');
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
