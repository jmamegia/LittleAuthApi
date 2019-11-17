const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: String
}, {
    timestamps: true
})

userSchema.methods.encryptPassword = async (password) => {
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10))
    return hash
}

userSchema.methods.passwordValidate = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = model('User', userSchema)