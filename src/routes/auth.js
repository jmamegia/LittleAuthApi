const { Router } = require('express');
const router = Router();
const { logIn, signUp, tokenVerify } = require('../controllers/authController')

router.route('/login')
    .post(logIn)

router.route('/signup')
    .post(signUp)

router.route('/')
    .post(tokenVerify)

module.exports = router;