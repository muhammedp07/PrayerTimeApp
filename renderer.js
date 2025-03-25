const { ipcRenderer } = require('electron');

async function loadPrayerTimes() {
    const prayerTimes = await ipcRenderer.invoke('fetch-prayer-times');

    if (!prayerTimes) {
        document.getElementById('prayer-times').innerHTML = "<li>Error loading prayer times</li>";
        return;
    }

    const list = document.getElementById('prayer-times');
    list.innerHTML = ""; // Clear previous content

    for (const [prayer, time] of Object.entries(prayerTimes)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${prayer}: ${time}`;
        list.appendChild(listItem);
    }
}

loadPrayerTimes();
