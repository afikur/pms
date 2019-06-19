const express = require('express');
const router = express.Router();
const {validate} = require('./user.model');
const userService = require('./users.service');

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.send(users);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const {err} = validate(req.body);
        if(err) {
            return res.status(400).send(error.details[0].message);
        }
        const user = await userService.createUser(req.body);
        res.send(user);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

router.get('/search', async (req, res) => {
    try {
        const user = await userService.findUserByEmail(encodeURI(req.query.email));
        if(!user) {
            return res.status(404).send('requested user not found');
        }
        res.send(user);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.id);
        if(!user) {
            return res.status(404).send('requested user not found');
        }
        res.send(user);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});


router.put('/:id', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);;
        }

        const user = await userService.findByIdAndUpdate(req.params.id, req.body);
        if(!user) {
            return res.status(404).send('The user with the given ID was not found.')
        }
        res.send(user);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await userService.findByIdAndRemove(req.params.id);
        if(!user) {
            res.status(404).send('The user with the given ID was not found.');;
        }
        res.send(user);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
