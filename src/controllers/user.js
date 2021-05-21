const ctrl = {};

const passport = require('passport');

const { User } = require('../models');

ctrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe tener al menos 4 caracteres' });
    }
    if (errors.length > 0) {
        res.render('', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            errors.push({ text: 'El email ya está en uso' });
            res.render('', {
                errors,
                name,
                password,
                confirm_password
            });
        }else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Registrado correctamente');
            res.redirect('/');
        }
    }
};

ctrl.signin = passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/perfil',
    failureFlash: true 
});

ctrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Sesión cerrada');
    res.redirect('/');
};

module.exports = ctrl;