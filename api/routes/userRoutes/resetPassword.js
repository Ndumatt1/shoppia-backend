const express = require('express');
const router = express.Router();
const { resetPasswordValidator, resetPassword } = require('../../controller/userController/resetPassword');

router.post('/reset-password', resetPasswordValidator, resetPassword);

module.exports = router;