const express = require('express');
const db = require('../../config');
const logout = require('../../controller/userController/logout');

const router = express.Router();

router.post('/logout', logout);

module.exports = router;
