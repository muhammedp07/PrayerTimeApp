const axios = require('axios');

let mainWindow;

async function getPrayerTimes() {
    const latitude = 40.7128;
    const longitude = -74.0060;
    const method = 2;

    const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`;

    try {
        const response = await axios.get(url);
        return response.data.data.timings;  // Returns an object with prayer times
    } catch (error) {
        console.error("Error fetching prayer times:", error);
        return null;
    }
    
}

const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
    try {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        mainWindow.loadFile('index.html');

        ipcMain.handle('fetch-prayer-times', async () => {
            return await getPrayerTimes();
        });
        
    } catch (error) {
        console.error("Error creating the window:", error);
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
