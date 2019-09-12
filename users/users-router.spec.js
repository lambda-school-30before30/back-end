// const request = require('supertest');

// const db = require('../database/dbConfig.js');

// const server = require('../api/server.js');

// const bcrypt = require('bcryptjs');

// const Users = require('./users-model.js');

// describe('auth-router.js', () => {
//     describe('GET "/api/users"', () => {
//         beforeEach(async () => {
//             await db('users').truncate();

//             await Users.add({
//                 username: 'testuser1',
//                 password: bcrypt.hashSync('password123', 10),
//                 email: 'testuser1@email.com'
//             });

//             await Users.add({
//                 username: 'testuser2',
//                 password: bcrypt.hashSync('password123', 10),
//                 email: 'testuser2@email.com'
//             });
//         });

//         // test status code
//         it('should return 200', async () => {
//             // login
//             const res1 = await request(server)
//                 .post('/api/auth/login')
//                 .send({
//                     username: 'testuser1',
//                     password: 'password123'
//                 })
//                 .set('Content-Type', 'application/json');
            
//             const res2 = await request(server)
//                 .get('/api/users')
//                 .set('Authorization', res1.body.token);

//             expect(res2.status).toBe(200);
//         });
//     });
// });

describe('placeholder', () => {
    it('true to return true', () => {
        expect(true).toBe(true);
    });
});