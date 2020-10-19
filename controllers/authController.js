const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Handle errors
const handleErrors = (err) => {
    let errors = {email: '', password: ''};

    // duplicate error code

    if(err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'diegman secret', {
        expiresIn: maxAge
    });
}

module.exports.getSignup = (req, res) => {
    res.render('signup');
}
module.exports.getLogin = (req, res) => {
    res.render('login');
}
module.exports.postSignup = async(req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ user: user._id });
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
module.exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    //console.log(email, password);
    res.send('new login');
}