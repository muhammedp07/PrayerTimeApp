const { ipcMain } = require("electron");

async function getPrayerTimes() {
  try {
    const response = await axios.get(
      "https://api.aladhan.com/v1/timingsByCity",
      {
        params: {
          city: "Toronto",
          country: "Canada",
          method: 2,
        },
      }
    );

    const timings = response.data.data.timings;
    mainWindow.webContents.send("prayer-times", timings);
  } catch (error) {
    console.error("Error fetching prayer times:", error);
  }
}
