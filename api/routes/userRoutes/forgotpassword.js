const express = require('express');
const { forgotPasswordValidator, forgotPassword } = require('../../controller/userController/forgotPassword');

const router = express.Router();

router.post('/forgotPassword', forgotPasswordValidator, forgotPassword);

module.exports = router;
