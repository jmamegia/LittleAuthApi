const { Router } = require('express');
const router = Router();
const { logIn, signUp } = require('../controllers/authController')

router.route('/login')
    .post(logIn)

router.route('/signup')
    .post(signUp)

module.exports = router;