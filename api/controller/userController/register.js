/*
 * This file defines the controller for user registration
 * Check the routes folder for the endpoint
 */

const User = require('../../models/users');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' });

/*const sendVerificationEmail = async (email, verificationLink) => {
    try {
        const shopEmail = process.env.EMAIL;
        const pass = process.env.PASS;
        
        const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: shopEmail,
            pass: pass,
        }
        });

    const mailDetails = {
    from: 'shoppiaonline8@gmail.com',
    to: email,
    subject: 'Email',
    html: `<p>Please verify your email address by clicking the following link:</p>
        <a href="${verificationLink}">Verify Email</a>`,
    };
    await mailTransporter.sendMail(mailDetails);
    } catch (err) {
    console.error(`Error sending verification email:${err}`);
    }
} */

const registerUser = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ Error: result.array() });
    }
    const { email, password, phonenumber, firstname, lastname, username } =
      req.body;

    const phoneNumberRegex = /^(\+234[0-9]{10})|(234[0-9]{10})|(0[7-9][01][0-9]{8})$/;

    if (!phoneNumberRegex.test(phonenumber)) {
      return res.status(400).json({ error: `Invalid phone number` });
    }
    /*if (phonenumber < 1000000000 || phonenumber > 9999999999) {
            return res.status(400).json({error: `Invalid phone number`});
        } */
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ error: `Email already exists` });
    }
    const usernameExists = await User.findOne({ where: { username } });
    if (usernameExists) {
      return res.status(400).json({ error: `Username already exists` });
    }
    const phoneNumberExists = await User.findOne({ where: { phonenumber } });
    if (phoneNumberExists) {
      return res
        .status(400)
        .json({ error: `Phone number is already registered` });
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
      phonenumber,
    });

    // const verificationToken = jwt.sign({userId: user.id }, 'mykey', {expiresIn: '1d'},);
    // const verificationLink = `https://shoppia-online.netlify.app/verify-email?token=${verificationToken}`;
    // await sendVerificationEmail(email, verificationLink);

    return res.status(200).json({ message: `User registered successfully` });
  } catch (err) {
    console.error(`Error registering user:`, err);
    return res.status(500).json({ error: `Internal server error` });
  }
};

module.exports = {
  registerUser: [
    body('email')
      .isEmail()
      .withMessage('Invalid email address')
      .normalizeEmail(),

    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 5, max: 25 })
      .withMessage('Username must be between 5 and 25 letters long'),

    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long')
      .matches(/\d/)
      .withMessage('Password must contain at least one digit')
      .matches(/[!@#$%^&*]/)
      .withMessage('Password must contain at least one special character'),

    body('firstname')
      .notEmpty()
      .withMessage('firstname is required')
      .isLength({ min: 5, max: 30 })
      .withMessage('Firstname must be between 5 and 30 characters'),

    body('lastname')
      .notEmpty()
      .withMessage('lastname is required')
      .isLength({ min: 5, max: 30 })
      .withMessage('Lastname must be between 5 and 30 characters'),

    body('phonenumber').isMobilePhone().withMessage(`Invalid phonenumber`),
    registerUser,
  ],
  //sendVerificationEmail
};
