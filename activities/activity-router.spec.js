const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('activity-router.js', () => {
    
    describe('GET /api/activities', () => {
        it('should return a status of 200', async () => {
            const expectedStatus = 200;
            const res = await request(server).get('/');
            expect(res.status).toEqual(expectedStatus);
        })        
    });

    describe('GET /api/activities/:id', () => {
        it('should return the activity with that id', async () => {

            const res = await request(server).get('/:id');
            expect(res.status).toEqual(200);
        });
    });
    
});