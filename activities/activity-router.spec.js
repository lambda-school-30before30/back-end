const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
const activitiesHelper = require('../activities/activity-model');

describe('activity-router.js', () => {
    beforeEach(async () => {
        await db('activities').truncate();
    });
    
    describe('GET /api/activities', () => {
        it('should return a 200 status', async () => {
            const test = await request(server).post('/api/auth/login').send({
                username: 'testUser',
                password: 'password123'
            })
            const expectedStatus = 200;
            // const res = await request(server).get('/api/activities');
            // expect(res.status).toEqual(expectedStatus);
            // console.log(test);
            request(server).get('/api/activities').set({authorization: test})
                .then(res => {
                    expect(res.status).toEqual(expectedStatus);
                })
        })        
    });
    
    describe('GET /api/activities/public', () => {
        it('should return 200 status', async () => {
            await activitiesHelper.add({
                title: "test title",
                isPublic: true,
                isCompleted: false,
                user_id: 2
            })
            const expectedStatus = 200;
            // const res = await activitiesHelper.find().where({isPublic: true});
            const res = await request(server).get('/api/activities/public')
            expect(res.status).toEqual(expectedStatus);
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
    })
});