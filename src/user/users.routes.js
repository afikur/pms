const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const {User, validate} = require('./user.model');
const userService = require('./users.service');

router.get('/', async (req, res) => {
    const users = await userService.getAllUsers();
    res.send(users);
});

router.post('/', async (req, res) => {
    const {err} = validate(req.body);
    if(err) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({$or: [{email: req.body.email}, {phone: req.body.phone}]});

    if(user) {
        res.status(400).send('User already registered.');
    }
    user = await userService.createUser(req.body);
    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).status(201).send(user);
});

router.get('/search', async (req, res) => {
    const user = await userService.findUserByEmail(encodeURI(req.query.email));
    if(!user) {
        return res.status(404).send('requested user not found');
    }
    res.send(user);
});

router.get('/:id', async (req, res) => {
    const user = await userService.findUserById(req.params.id);
    if(!user) {
        return res.status(404).send('requested user not found');
    }
    res.send(user);
});


router.put('/:id', async (req, res) => {
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);;
        }

        const user = await userService.findByIdAndUpdate(req.params.id, req.body);
        if(!user) {
            return res.status(404).send('The user with the given ID was not found.')
        }
        res.status(201).send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await userService.findByIdAndRemove(req.params.id);
    if(!user) {
        return res.status(404).send('The user with the given ID was not found.');;
    }
    res.send(user);
});

module.exports = router;
