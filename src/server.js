import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
    console.log("[✅] Disconnected To Server");
};

function onSocketMessage(message) {
    console.log(message)
};

wss.on("connection", (socket) => {
    console.log("[✅] Connected To Browser");
    socket.on("close", onSocketClose);
    socket.on("message", (data, isBinary) => {
        const message = isBinary ? data : data.toString()
        console.log(message)
    });
    socket.send("Hello");
});

server.listen(3000, handleListen);