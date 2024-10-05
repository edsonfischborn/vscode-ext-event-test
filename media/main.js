// @ts-nocheck

const vscode = acquireVsCodeApi();

console.log("rendered script main.js on webview");

// If you uncomment the function, the event 'message' is not triggered. (global postMessage conflict) ==================
/* var postMessage = () => {
  vscode.postMessage({ command: "openSettings" });
}; */
// end comment =============================================

window.addEventListener("message", (event) => {
  const h2 = document.querySelector("h2");
  h2.innerHTML = (Number(h2.innerHTML) || 0) + 1;
});
