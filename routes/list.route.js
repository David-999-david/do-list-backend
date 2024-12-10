module.exports = app => {

    const lists = require('../controller/list.controller.js');

    const router = require('express').Router();

    router.post('/', lists.create);

    router.get('/', lists.findAll);

    router.get('/completed', lists.findAllCompleted);

    router.get('/:id', lists.findOne);

    router.put('/:id', lists.update);

    router.delete('/:id', lists.deleteOne);

    router.delete('/', lists.deleteAll);

    app.use('/api/lists',router);
}