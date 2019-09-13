const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
const activitiesHelper = require('../activities/activity-model');

describe('activity-router.js', () => {
    beforeEach(async () => {
        await db('activities').truncate();
    });
    let token;

    beforeAll((done) => {
        request(server)
            .post('/api/auth/login')
            .send({
                username: 'testUser',
                password: 'password123'
            })
            .end((err, response) => {
                token = response.body.token;
                done();
            });
    });

    describe('GET /api/activities', () => {
        it('should require authorization', () => {
            return request(server)
                .get('/api/activities')
                .then((response) => {
                    expect(response.status).toEqual(401);
                });
        });
        it('responds with JSON', () => {
            return request(server)
                .get('/api/activities')
                .set('Authorization', `Bearer ${token}`)
                .then((response) => {
                    // expect(response.status).toEqual(200);
                    expect(response.type).toEqual('application/json');
                });
        });
    });
    
    // describe('GET /api/activities', () => {
    //     it('should return a 200 status', async () => {
    //         const test = await request(server).post('/api/auth/login').send({
    //             username: 'testUser',
    //             password: 'password123'
    //         })
    //         request(server).get('/api/activities')
    //             .set({authorization: test})
    //             .then(res => {
    //                 expect(res.status).toEqual(200);
    //             })
    //     })        
    // });
    
    describe('GET /api/activities/public', () => {
        it('should return 200 status', async () => {
            await activitiesHelper.add({
                title: "test title",
                isPublic: true,
                isCompleted: false,
                user_id: 2
            })
            
            const res = await request(server).get('/api/activities/public')
            expect(res.status).toEqual(200);
        })        
    });

    describe('GET /api/activities/:id', () => {
        it('should return a single activity with given id', async () => {
            
            await activitiesHelper.add({
                title: "new activity",
                isPublic: true,
                isCompleted: false,
                user_id: 1
            })
            const res = await request(server).get('/api/activities/:id')
            expect(res.status).toEqual(200);
        })
    });

    describe('POST /api/activities', () => {
        it('should return 201', async () => {
            let activity = {
                title: 'node build week',
                isPublic: false,
                isCompleted: false,
                user_id: 1
            };

            request(server)
                .post('/api/activities')
                .send(activity)
                .expect(201)
        });
    });

    describe('PUT /api/activities/:id', () => {
        it('should update activity with that id', async () => {
            let activity = {
                title: 'updated node build week',
                isPublic: false,
                isCompleted: false,
                user_id: 1
            };

            request(server)
                .put('/api/activities/:id')
                .send(activity)
                .expect(204)
        });
    });

    describe('DELETE /api/activities/:id', () => {
        it('should delete the activity with that id', async () => {
            let activity = {
                title: 'node build week',
                isPublic: false,
                isCompleted: false,
                user_id: 1
            };

            request(server)
                .delete('/api/activities/:id')
                .expect(200)
        });
    });
});