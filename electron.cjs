const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");
const Store = require("electron-store");

const store = new Store();

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    title: "Slagbok",
    icon: path.join(__dirname, "build/icon.ico"),
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

// Lokal datalagring — sparas i användarens AppData-mapp
ipcMain.handle("store-get", (_e, key) => store.get(key));
ipcMain.handle("store-set", (_e, key, value) => store.set(key, value));
ipcMain.handle("store-delete", (_e, key) => store.delete(key));

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
});
app.on("window-all-closed", () => app.quit());
