const { app, BrowserWindow } = require("electron");
const axios = require("axios");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");

  getPrayerTimes(); // Fetch prayer times when app starts
});

async function getPrayerTimes() {
  try {
    const response = await axios.get(
      "https://api.aladhan.com/v1/timingsByCity",
      {
        params: {
          city: "Toronto", // You can later make this user-configurable
          country: "Canada",
          method: 2, // Calculation method
        },
      }
    );

    const timings = response.data.data.timings;
    console.log("Prayer Times:", timings);
  } catch (error) {
    console.error("Error fetching prayer times:", error);
  }
}
