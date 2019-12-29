const authCtrl = {}
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const scrt = require('../config/cfg')

authCtrl.signUp = async (req, res) => {
    const { email, name, password } = req.body

    var user = await User.findOne({ $or: [{ email }, { name }] })
    if (user) {
        var message = null
        if (user.email == req.body.email) message = 'Email already in use'
        else message = 'Name already exists'
        res.json({ auth: false, message })
    } else {

        user = new User({
            name,
            email,
            password
        });

        user.password = await user.encryptPassword(password)
        await user.save();
        const token = authCtrl.newToken(user)
        res.json({ auth: true, token, user: { name, email, _id: user._id } })

    }
}


authCtrl.logIn = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const user = await User.findOne({ $or: [{ email }, { name }] })
        const token=authCtrl.newToken(user)
        res.json({ auth: user.passwordValidate(password) || false,  token, user: { name, email, _id: user._id } })
    } catch{ res.json({ auth: false }) }

}

authCtrl.tokenVerify = async (req, res, next) => {
    try {
        const token=req.header('x-access-token')
        const decoded = jwt.verify(token, scrt)
        const user = await User.findOne({ _id: decoded.user._id })
        
        res.json({ auth: true, token, user: { name:user.name, email:user.email, _id: user._id } })
    } catch { res.json({ aut: false, message: 'Token error' }) }

    next()
}

authCtrl.newToken = function (user) {
    const token = jwt.sign({ user }, scrt, {
        expiresIn: 60 * 60 * 24
    })
    return token
}
module.exports = authCtrl;