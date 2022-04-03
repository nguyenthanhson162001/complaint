const express = require("express");
const app = express();
// const https = require("https");
require("dotenv").config();
var morgan = require("morgan");
const fs = require("fs");
const port = process.env.PORT | 3000;
const options = {
  key: fs.readFileSync("ssl/key.pem"),
  cert: fs.readFileSync("ssl/cert.pem"),
};
const { sendEmail } = require("./emailUntil");
const { insertComplaint } = require("./dbUntil");
morgan("tiny");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get("/", (req, res) => res.send("Hello this is server!"));
app.use(morgan("combined"));
app.post("/complaint", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!email || !message) {
    res.json({ status: false });
    return;
  }
  sendEmail("Complaint from " + email + " : " + subject, message);

  insertComplaint({ name, email, subject, message });
  res.json({ status: true });
});

// https
//   .createServer(options, app)
//   .listen(port, () =>
//     console.log(`Server app listening on port https://localhost:${port}`)
//   );

var server_port = process.env.PORT || 80;
var server_host = "0.0.0.0";

app.listen(server_port, server_host, () =>
  console.log(`Server app listening on port https://localhost:${server_port}`)
);
