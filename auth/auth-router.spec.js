const request = require('supertest');
const superagent = require('superagent');

const db = require('../database/dbConfig.js');

const bcrypt = require('bcryptjs');

const server = require('../api/server.js');

describe('auth-router.js', () => {
    describe('POST "/register"', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        // test status code
        it('should return 201', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({
                    username: 'testuser1',
                    password: 'password123',
                    email: 'testuser1@email.com'
                })
                .set('Content-Type', 'application/json');

            await expect(res.status).toBe(201);
        });
    });

    describe('POST "/login"', () => {
        beforeEach(async () => {
            await db('users').truncate();

            // add user to login as
            await db('users').insert({
                username: 'testuser',
                password: bcrypt.hashSync('password123', 10),
                email: 'testuser@email.com'
            });
        });

        // test status code
        it('should return 200', async () => {
            // login
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password123'
                })
                .set('Content-Type', 'application/json');

            await expect(res.status).toBe(200);
        });

        // test return type
        it('should return a json object', async () => {
            // login
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password123'
                })
                .set('Content-Type', 'application/json');

            await expect(res.type).toBe('application/json');
        });

        // test return object
        it('should return token', async () => {
            // login
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testuser3341',
                    password: 'password123'
                })
                .set('Content-Type', 'application/json');

            await expect(res.body.token);
        });
    });

    describe('DELETE "/logout"', () => {
        beforeEach(async () => {
            await db('users').truncate();

            // add user to login as
            await db('users').insert({
                username: 'testuser',
                password: bcrypt.hashSync('password123', 10),
                email: 'testuser@email.com'
            });
        });
        // test status code
        it('should return 204', async () => {
            // login
            const agent = superagent.agent();
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password123'
                })
                .set('Content-Type', 'application/json')
                .then(res => {
                    console.log(res.body.token);
                    console.log(agent);
                    agent.jar.setCookie(res);
                });

            expect(false).toBe(204);
        });

        // test return type
        it('should return a json object', async () => {});

        // test return object
        it('should return { message: "Logged out" }', async () => {});
    });
});
