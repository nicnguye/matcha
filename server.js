const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//const app = express();

//const server = require("http").Server(app);
//const io = require("socket.io")(server);
const ent = require("ent");

let server = express();
const cors = require("cors");
let Router = require("./controllers/userRoutes").router;
let http = require("http");

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan("dev"));

server.get("/", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send("<h1>Matcha youpi !</h1>");
});

server.use("/api", Router);

let app = http.createServer(server);
app.listen(8001, () => console.log("Server on"));

let io = (module.exports.io = require("socket.io")(app));

//Body Parser
/*
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//Définition des CORS
app.use(function(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});*/
/*
let router = express.Router();
app.use("/api", router);
require(__dirname + "/controllers/userRoutes")(router);

const port = process.env.PORT || 8001;
//let server = app.listen(port, () => console.log(`Listening on port ${port}`));
server.listen(8001);

/***********  SOCKET IO *************/
io.sockets.on("connection", function(socket) {
  socket.on("SUBSCRIBE_ROOM", data => {
    socket.join(data);
  });

  socket.on("SEND_MESSAGE", data => {
    io.to(data.conversation_id).emit("RECEIVE_MESSAGE", data);
  });
});
