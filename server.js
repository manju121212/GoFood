const express = require("express");
const app = express();
const mongodb = require("./db");
const path = require('path');
mongodb();
let cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));

app.use('/api', require("./Routes/displaydata"));
app.use('/api', require("./Routes/Orderdata"));
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const port = process.env.PORT || 8080;

app.listen(port);
