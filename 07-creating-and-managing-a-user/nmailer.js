"use strict";
const nodemailer = require("nodemailer");
// random serial number generation
var generator = require("generate-serial-number");

// random email id generator
//npm install --save random-email

//npm install dateformat
var dateFormat = require("dateformat");

//random name npm install node-random-name
var random_name = require("node-random-name");
//+ randomEmail({ domain: 'symbioticindia.in' }) + " "
// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  var text = "";
    var i = 0;
  while (i < 10) {
    var serialNumber = generator.generate(10); // '8380289275'
    var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    //var randomEmail = require('random-email');
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.symbioticindia.in",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: "gracious@symbioticindia.in", // generated ethereal user
        pass: "Sharda@23", // generated ethereal password
      },
    });

    // send mail with defined transport object "👻" 
    let info = await transporter.sendMail({
      from: random_name() +" 👻 "+'<gracious@symbioticindia.in>',
      //replyTo: 'gracious@symbioticindia.in', // sender address
      //to:"lalit@symbioticindia.in",
      to: "sasen@etisalat.ae, lalit@symbioticindia.in", // list of receivers
      //cc: "lalit@symbioticindia.in",
      subject: "Hello ✔ " + serialNumber + " " + day + text, // Subject line
      //text: "Account Number " + serialNumber, // plain text body
      text: 'I hope this message gets read!',
      html: "<b>Account Number " + serialNumber + "</b> <b> Test email from - Lalit Nayyar </b>  ", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
   // console.log("Hello");
   // sleep(10000).then(() => {
    //    console.log("World!");
    //})
    
    
    //function sleep(ms) {
    //    return new Promise(resolve => setTimeout(resolve, ms));
    //}
    
    i++;
    text += "The number is " + i;
    
  }
}

main().catch(console.error);
