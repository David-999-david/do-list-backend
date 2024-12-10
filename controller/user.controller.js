const db = require('../models');

const User = db.user;

exports.signUp = (req, res) => {
    if (!req.body){
        res.send({
            message : 'User data is require for register!'
        })
        return;
    }

    const user = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }

    User.create(user)
    .then(data=>{
        res.send({
            message : 'Register successfully!'
        })
    })
    .catch(err=>{
        res.status(500).send({
            message : 'Error when registering!'
        })
    })
}

exports.findUserById = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
    .then(data=>{
        if (data) {
            res.send(data)
        }
        else {
            res.status(400).send({
                message : `Cannot find the user with id=${id}`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || `Error when finding the user with id=${id}`
        })
    })
}

exports.updateUser = (req, res) => {
    const id = req.params.id;

    User.update(req.body,{
        where : {id : id}
        .then(nums => {
            if (num == 1) {
                res.send({
                    message : `Successfully update user with id=${id}}`
                })
            } else {
                res.status(400).send({
                    message : `Cannot update user with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).sen({
                message : err.message || 'Error when updating user with id' + id
            })
        })
    })
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where : {id:id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message : `Successfully delete user with id=${id}`
            })
        } else {
            res.status(400).send({
                message : `Cannot delete user with id=${id}`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || 'Error when deleting user with id'+id
        })
    })
}
