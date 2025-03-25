const { app, BrowserWindow, ipcMain } = require("electron");
const axios = require("axios");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,  // Enable nodeIntegration to allow `require` in renderer
      contextIsolation: false, // Disable contextIsolation for ease of use during dev (make sure to enable it before production)
    },
  });

  mainWindow.loadFile("index.html");

  // Listen for renderer request to get prayer times
  ipcMain.on("get-prayer-times", (event) => {
    getPrayerTimes().then((times) => {
      event.reply("prayer-times", times);  // Send prayer times to renderer
    });
  });
});

async function getPrayerTimes() {
  try {
    const response = await axios.get("https://api.aladhan.com/v1/timingsByCity", {
      params: {
        city: "Toronto", // You can later make this user-configurable
        country: "Canada",
        method: 2, // Calculation method
      },
    });

    const timings = response.data.data.timings;
    return timings;  // Return timings to send to renderer
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return {}; // Return empty object if there's an error
  }
}
