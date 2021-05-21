const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const bulo = require('../controllers/bulo');
const user = require('../controllers/user');

const { isAuthenticated } = require('../helpers/auth');

module.exports = app => {
    // Index Routes
    router.get('/', home.index);

    // Bulo Routes
    router.get('/bulo/:bulo_id', bulo.index);
    router.get('/perfil', isAuthenticated, bulo.perfil);
    router.post('/bulo', isAuthenticated, bulo.create);
    router.post('/bulo/:bulo_id/like', isAuthenticated, bulo.like);
    router.post('/bulo/:bulo_id/comment', isAuthenticated, bulo.comment);
    router.delete('/bulo/:bulo_id', isAuthenticated, bulo.remove);

    // User Routes
    router.post('/users/signup', user.signup);
    router.post('/users/signin', user.signin);
    router.get('/users/logout', isAuthenticated, user.logout);

    app.use(router);
};