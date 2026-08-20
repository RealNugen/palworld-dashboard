#!/bin/bash

# Pfad zu deinem Repository anpassen (z. B. ~/palworld-dashboard)
REPO_DIR="/home/nugen/palworld-dashboard"
PLAYIT_ADDR="reminded-singles.tun.ply.gg:37255"

cd "$REPO_DIR" || exit

# Systemdaten auslesen
CPU=$(top -bn1 | grep "Cpu(s)" | sed "usr/bin/sed" 2>/dev/null || top -bn1 | grep "%Cpu" | awk '{print $2}' | cut -d'.' -f1)
[ -z "$CPU" ] && CPU=$(LC_ALL=C top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'.' -f1)

RAM_TOTAL=$(free -g | awk '/Mem:/ {print $2}')
RAM_USED=$(free -m | awk '/Mem:/ {printf "%.1f", $3/1024}')
RAM_PCT=$(free | awk '/Mem:/ {printf "%.0f", $3/$2 * 100}')

DISK_TOTAL=$(df -h / | awk 'NR==2 {print $2}' | sed 's/G//')
DISK_USED=$(df -h / | awk 'NR==2 {print $3}' | sed 's/G//')
DISK_PCT=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

TIMESTAMP=$(date +"%d.%m.%Y - %H:%M Uhr")

# JSON schreiben
cat <<EOF > stats.json
{
  "cpu_usage": "$CPU",
  "ram_used": "$RAM_USED",
  "ram_total": "$RAM_TOTAL",
  "ram_percent": "$RAM_PCT",
  "disk_used": "$DISK_USED",
  "disk_total": "$DISK_TOTAL",
  "disk_percent": "$DISK_PCT",
  "playit_address": "$PLAYIT_ADDR",
  "updated_at": "$TIMESTAMP"
}
EOF

# Bei Git committen und pushen
git add index.html stats.json
git commit -m "Auto-update stats"
git push origin main
