const nodemailer = require('nodemailer')
const adminPassword = process.env.GOOGLE_PASS
const adminEmail = process.env.GOOGLE_EMAIL

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: adminEmail,
        pass: adminPassword
    },
    tls: {
        rejectUnauthorized: false
      }
})

function sendEmail (email) {
    const mailOptions = {
        from: adminEmail,
        to: email,
        subject: 'thank you, i hope you enjoy our service',
        text: `Hi ${email}, thank you for using our service :)`
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('email sent' + info.response);
        }
    })
}

function sendReceipt (email, image, name) {
    console.log(email, name);
    const mailOptions = {
        from: adminEmail,
        to: email,
        subject: 'Receipt',
        text: `Hi ${email}, thank you for ordering :)`,
        html: `<div class="card">
        <img src="${image}" alt="Avatar" style="width:100%">
        <div class="container">
          <h4><b>${name}</b></h4>
          <p>usedaircraft.com</p>
          <hr>
          Hi ${email}, thank you for ordering :) 
          <p>by Dzakyalr</p>
        </div>
      </div>`,
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('email sent' + info.response);
        }
    })
}
module.exports = {
    sendEmail,
    sendReceipt
}