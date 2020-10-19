const mongoose = require('mongoose');
const { isEmail } = require('validator');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your Email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your Password'],
        minlength: [6, 'The minimum password length is 6 characters'],
    }
});

// Fire a function after doc saved to db

userSchema.post('save', function(doc, next) {
    console.log('new user was created & save', doc);
    next();
});

// fire a function before doc save to db

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;
