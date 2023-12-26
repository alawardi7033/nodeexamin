const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const mongoConnection = require("../testnode/config/dbconnection.json");
const path = require("path");
const { servirsocket , affichesocket } = require("./controller/serveurcontroller");
var app = express(); // Move this line up
// les deux lignes hethom homa ali ya9raw fichier .twig ay haja feha html
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

mongoose
  .connect(mongoConnection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo connection error:", err));

var serveurrouter = require("../examin_01/routes/serveur");
var platrouter = require("../examin_01/routes/plat");
const bodyParser = require("body-parser");

// app.use(express.json()); // You can uncomment this line if needed
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/serveur", serveurrouter);
app.use("/plat", platrouter);
const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  //ouverture de flux , data dynamique
  console.log("user connect");


  socket.on("platservi", (data) => {
    servirsocket(data);
    io.emit("platservi", data);
  });

  socket.on("aff", async (data) => {
    console.log("oooo", JSON.stringify(data));
    const r = await affichesocket(data);
    console.log("jjjjjj", JSON.stringify(r));
    io.emit("aff", r);
  });

  socket.on("disconnect", () => { //hne ki tsaker inty l'interface ykharjlik fi interface okhra raho flen is diconnected
    console.log("user disconnect");
    io.emit("msg", "user is disconnect");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
