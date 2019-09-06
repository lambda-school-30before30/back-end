const express = require('express');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const cors = require('cors');
const helmet = require('helmet');
const secret = require('../config/secret.js');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionOptions = {
    name: '30before30_login',
    secret: secret.jwtSecret,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2hr
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('../database/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60 * 2
    })
};

const db = require('../database/dbConfig');

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionOptions));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send(`<h1>BUILD WEEK BAYBAY</h1>`);
});

server.get('/test', async (req, res) => {
    const users = await db('users');

    try {
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = server;
