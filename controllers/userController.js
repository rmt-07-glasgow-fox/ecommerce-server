const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jsonwebtoken')
const nodemailer = require('nodemailer')

class UserController {
    static login(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        User.findOne({
            where: { email }
        })
            .then(data => {
                if (!data) {
                    next({ name: 'Invalid Input' })
                } else {
                    if (comparePassword(password, data.password)) {
                        //jwt
                        let payload = {
                            id: data.id,
                            email: data.email
                        }
                        let access_token = generateToken(payload)
                        res.status(200).json({ access_token })
                    } else {
                        next({ name: 'Invalid Input' })
                    }
                }
            })
            .catch(next)
    }

    static register (req, res, next) {
        let input = {
            email: req.body.email, 
            password: req.body.password
        }
        User.create(input)
            .then(data => {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'nodemailer05@gmail.com',
                      pass: 'testnodemailerlagi'
                    }
                });
                let mailOptions = {
                    from: 'nodemailer05@gmail.com',
                    to: input.email,
                    subject: 'Registration Success',
                    text: 'Congratulations, your account has been succesfully created'
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                      res.status(201).json({ id: data.id, email: data.email })
                    }
                  });
            })
            .catch(next)
    }
}

module.exports = UserController