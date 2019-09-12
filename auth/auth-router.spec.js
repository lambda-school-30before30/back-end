const request = require('supertest');

const db = require('../database/dbConfig.js');

const server = require('../api/server.js');
// const router = require('./auth-router.js');

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

            expect(res.status).toBe(201);
        });
    });

    describe('POST "/login"', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });

        // test status code
        it('should return 200', async () => {
            // add user to login as
            await db('users').insert(
                {
                    username: 'testuser',
                    password: 'password123',
                    email: 'testuser@email.com'
                }
            );

            const users = await db('users');
            console.log(users)

            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password123'
                })
                .set('Content-Type', 'application/json');

            // console.log(res)

            expect(res.status).toBe(200);
        });

        // test return type
        it('should return a json object', async () => {});
    });

    describe('DELETE "/logout"', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        // test status code
        it('should return 204', async () => {});

        // test return type
        it('should return a json object', async () => {});

        // test return object
        it('should return { message: "Logged out" }', async () => {});
    });
});
