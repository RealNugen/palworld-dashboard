// Funktion zum Abrufen der Server-Daten von der Flask-API
async function fetchStats() {
  const statusText = document.getElementById('status-text');
  try {
    const response = await fetch('https://enviably-saturday-barrette.ngrok-free.dev/api/stats', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();

    if (document.getElementById('uptime')) document.getElementById('uptime').innerText = data.uptime || '--';
    if (document.getElementById('load')) document.getElementById('load').innerText = data.load || '--';
    if (document.getElementById('disk')) document.getElementById('disk').innerText = data.disk || '--';
    if (document.getElementById('memory')) document.getElementById('memory').innerText = data.memory || '--';
    if (document.getElementById('temp')) document.getElementById('temp').innerText = data.temp ? `${data.temp} °C` : '-- °C';
    if (document.getElementById('processes')) document.getElementById('processes').innerText = data.processes || '--';

    if (statusText) {
      statusText.innerText = 'PS C:\\SYSTEM> ONLINE';
      statusText.style.color = '#00ff66';
    }
  } catch (error) {
    if (statusText) {
      statusText.innerText = 'PS C:\\SYSTEM> OFFLINE';
      statusText.style.color = '#ff3333';
    }
  }
}

function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const hint = element.querySelector('.copy-hint');
    if (hint) hint.innerText = 'Kopiert!';
    element.classList.add('copied');
    setTimeout(() => {
      if (hint) hint.innerText = 'Kopieren';
      element.classList.remove('copied');
    }, 2000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const menuBox = document.getElementById('menu-box');

  if (menuBtn && menuBox) {
    menuBtn.addEventListener('click', () => {
      menuBox.classList.toggle('hidden');
    });
  }

  fetchStats();
  setInterval(fetchStats, 5000);
});
