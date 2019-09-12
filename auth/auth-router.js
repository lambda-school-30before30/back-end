const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js');
const restricted = require('./restricted-middleware.js');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    let user = req.body;

    if (user.username && user.password) {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.add(user)
            .then(saved => {
                res.status(201).json(saved);
            })
            .catch(err => {
                res.status(500).json({ message: 'Error: Could not add new user', err });
            });
    } else {
        res.status(400).json({ message: 'Error: Invalid username and/or password' });
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user);

                req.session.token = token;

                res.status(200).json({
                    message: `Logged in as ${username}`,
                    token
                });
            } else {
                res.status(401).json({
                    message: `Error: Invalid credentials`
                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/logout', restricted, (req, res) => {
    if (req.session.token) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).json({ message: 'Error: Unable to logout' });
            } else {
                res.status(204).json({ message: 'Logged out' });
            }
        });
    } else {
        res.end();
    }
});

function genToken(user) {
    const payload = {
        subject: 'username',
        username: user.username
    };

    const options = {
        expiresIn: '2h'
    };

    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
