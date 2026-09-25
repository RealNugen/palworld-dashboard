// Function to update UI elements with telemetry data
function updateDashboardUI(data) {
    if (!data) return;

    // 1. Uptime
    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement && data.uptime) {
        let uptimeData = data.uptime;
        
        // Falls das Backend die Uptime als JSON-String liefert, zuerst parsen
        if (typeof uptimeData === 'string') {
            try {
                uptimeData = JSON.parse(uptimeData);
            } catch (e) {
                // Falls es ein einfacher String ist
            }
        }

        // Wenn es ein Objekt ist, nutze das "formatted"-Feld oder baue den String selbst zusammen
        if (typeof uptimeData === 'object' && uptimeData !== null) {
            if (uptimeData.formatted) {
                uptimeElement.innerText = uptimeData.formatted;
            } else if (uptimeData.days !== undefined) {
                uptimeElement.innerText = `${uptimeData.days}d ${uptimeData.hours || 0}h ${uptimeData.minutes || 0}m`;
            } else {
                uptimeElement.innerText = JSON.stringify(uptimeData);
            }
        } else {
            uptimeElement.innerText = uptimeData;
        }
    }

    // 2. CPU Load / System Load
    const loadElement = document.getElementById('cpu-value') || document.getElementById('cpu') || document.getElementById('load');
    const loadValue = data.cpu_load ?? data.load ?? data.load_avg;
    if (loadElement) {
        if (loadValue !== undefined && loadValue !== null) {
            loadElement.innerText = typeof loadValue === 'number' ? `${loadValue}%` : loadValue;
        } else {
            loadElement.innerText = '-';
        }
    }

    // 3. RAM Usage
    const ramElement = document.getElementById('ram-value') || document.getElementById('ram') || document.getElementById('memory');
    if (ramElement && data.memory) {
        if (typeof data.memory === 'object') {
            const used = data.memory.used_gb ?? '-';
            const total = data.memory.total_gb ?? '-';
            const percent = data.memory.percent ?? data.memory;
            ramElement.innerText = (data.memory.used_gb && data.memory.total_gb) 
                ? `${used} / ${total} GB (${percent}%)` 
                : `${percent}%`;
        } else {
            ramElement.innerText = `${data.memory}%`;
        }
    }

    // 4. Disk Usage
    const diskElement = document.getElementById('disk-value') || document.getElementById('disk');
    if (diskElement && data.disk) {
        if (typeof data.disk === 'object') {
            const used = data.disk.used_gb ?? '-';
            const total = data.disk.total_gb ?? '-';
            const percent = data.disk.percent ?? data.disk;
            diskElement.innerText = (data.disk.used_gb && data.disk.total_gb) 
                ? `${used} / ${total} GB (${percent}%)` 
                : `${percent}%`;
        } else {
            diskElement.innerText = `${data.disk}%`;
        }
    }

    // 5. CPU Temperature
    const tempElement = document.getElementById('temp-value') || document.getElementById('temp') || document.getElementById('temperature');
    if (tempElement) {
        if (data.temperature !== undefined && data.temperature !== null && data.temperature !== '-') {
            tempElement.innerText = `${data.temperature} °C`;
        } else {
            tempElement.innerText = '-';
        }
    }
}
