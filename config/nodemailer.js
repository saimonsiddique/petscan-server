process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hello.petscan@gmail.com",
    pass: "xycoackthztyawud",
  },
});

const transport = (mailOptions) =>
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
module.exports = transport;
