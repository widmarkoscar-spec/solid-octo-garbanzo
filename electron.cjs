const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    title: "Slagbok",
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "dist/index.html"));

  win.once("ready-to-show", () => {
    // Vänta 3 sekunder innan uppdateringskontroll så appen hinner starta
    setTimeout(() => autoUpdater.checkForUpdates(), 3000);
  });
}

autoUpdater.on("update-available", () => {
  win?.webContents.send("update-status", { type: "available" });
});

autoUpdater.on("update-downloaded", () => {
  win?.webContents.send("update-status", { type: "downloaded" });
});

autoUpdater.on("error", (err) => {
  console.error("AutoUpdater error:", err);
});

ipcMain.on("install-update", () => {
  autoUpdater.quitAndInstall();
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
