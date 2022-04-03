const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenthanhson01062001@gmail.com",
    pass: "SonSonSon@162001",
  },
});

module.exports = {
  sendEmail: (subject, text) => {
    var mailOptions = {
      from: "nguyenthanhson01062001@gmail.com",
      to: "nguyenthanhson162001@gmail.com",
      subject,
      text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
