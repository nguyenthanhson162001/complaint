const express = require("express");
const app = express();
const https = require("https");
require("dotenv").config();
const fs = require("fs");
const port = process.env.PORT | 3000;
const options = {
  key: fs.readFileSync("ssl/key.pem"),
  cert: fs.readFileSync("ssl/cert.pem"),
};
const { sendEmail } = require("./emailUntil");
const { insertComplaint } = require("./dbUntil");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get("/", (req, res) => res.send("Hello this is server!"));
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

app.listen(port, () =>
  console.log(`Server app listening on port https://localhost:${port}`)
);
