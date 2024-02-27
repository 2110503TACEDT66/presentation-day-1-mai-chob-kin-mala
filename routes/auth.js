const express = require('express');
const router = express.Router();

const {register, login, getMe} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(getMe);

module.exports = router;