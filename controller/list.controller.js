const { where } = require('sequelize');
const db = require('../models');

const List = db.list;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title){
        res.status(400).send({
            message : 'Title must not be empty!'
        })
        return;
    }

    const list = {
        title : req.body.title,
        summary : req.body.summary,
        completed : req.body.completed ? req.body.completed : false
    }

    List.create(list)
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message : err.message || 'Some error when creating list!'
        })
    })
}

exports.findAll = (req ,res) => {
    const title = req.query.title;
    const condition = title ? { title : {[Op.like] : `%${title}%`} } : null;

    List.findAll({
        where : condition
    })
    .then(data=> {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || 'Error when retrieving all list!'
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    
    List.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data)
        } else {
            res.status(400).send({
                message : `Cannot find the list with id=${id}`
            })
        }
    })
    .catch(err=> {
        res.status(500).send({
            message : `Error when retrieving the list with id=${id}`
        })
    })
}

exports.update = (req, res) => {
    const id = req.params.id;

    List.update(req.body,{
        where : {id:id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message : `Successfully update the list with id=${id}`
            })
        } else {
            res.status(400).send({
                message : `Cannot update the list with id=${id}`
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message : `Error when updating the list with id=${id}`
        })
    })
}

exports.deleteOne = (req, res) => {
    const id =req.params.id;

    List.destroy({
        where : {id:id}
    })
    .then(num => {
        if (num) {
            res.send({
                message : `Successfully delete the list with id=${id}`
            })
        } else {
            res.status(400).send({
                message : `Cannot delete the list with id=${id}`
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message : `Error when deleting the list with id=${id}`
        })
    })
}

exports.deleteAll = (req, res) => {
    List.destroy({
        where : {},
        truncate : false
    })
    .then(num=>{
        res.send({
            message : 'Successfully deleted all lists!'
        })
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || 'Error when deleting all lists!'
        })
    })
}

exports.findAllCompleted = (req, res) => {
    List.findAll({
        where : {completed : true}
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || 'Error when retrieving all completed lists!'
        })
    })
}