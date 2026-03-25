const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateStatus: (callback) =>
    ipcRenderer.on("update-status", (_e, msg) => callback(msg)),
  installUpdate: () => ipcRenderer.send("install-update"),
  store: {
    get: (key) => ipcRenderer.invoke("store-get", key),
    set: (key, value) => ipcRenderer.invoke("store-set", key, value),
    delete: (key) => ipcRenderer.invoke("store-delete", key),
  },
});
