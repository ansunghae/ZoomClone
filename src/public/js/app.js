const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("[✅] Connected To Server");
});

socket.addEventListener("message", (message) => {
    console.log("New Message ", message, "from the Server");
});

socket.addEventListener("close", () => {
    console.log("[✅] Disconnected To Server")
});

setTimeout(() => {
    socket.send("Hello from the browser");
}, 10000);