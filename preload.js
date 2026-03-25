const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateStatus: (callback) =>
    ipcRenderer.on("update-status", (_e, msg) => callback(msg)),
  installUpdate: () => ipcRenderer.send("install-update"),
});
