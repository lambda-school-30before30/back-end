const router = require('express').Router();
const restricted = require('../auth/restricted-middleware.js');

const Users = require('./users-model');

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

router.put('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const userInfo = req.body;

    Users.update(id, userInfo)
        .then(updated => {
            res.json({ message: `Updated user ${id}`, updated });
        })
        .catch(err => res.status(500).json(err));
});

router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(removed => {
            res.json({ message: `Deleted user ${id}`, removed });
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;
