module.exports = app => {
    const user = require('../controller/user.controller.js');

    const router = require('express').Router();

    router.post('/sign-up', user.signUp);

    router.get('/:id', user.findUserById);

    router.put('/:id', user.updateUser);

    router.delete('/:id', user.deleteUser);

    app.use('/api/users',router);
}