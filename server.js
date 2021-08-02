const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
require('dotenv').config()

// initialize nodemailer
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adebola.rb.js@gmail.com",
    pass: process.env.password,
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

var mailOptions = {
  from: '"Adebola" <adebola.rb.js@gmail.com>', // sender address
  to: "adebola.rb.js@gmail.com", // list of receivers
  subject: "Welcome!",
  template: "email", // the name of the template file i.e email.handlebars
  context: {
    name: "Adebola", // replace {{name}} with Adebola
    company: "My Company", // replace {{company}} with My Company
  },
  attachments: [{ filename: "pic-1.jpeg", path: "./attachments/pic-1.jpeg" }],
};

// trigger the sending of the E-mail
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    return console.log(error);
  }
  console.log("Message sent: " + info.response);
});
