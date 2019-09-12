const db = require('../database/dbConfig.js');

const Users = require('./users-model.js');

describe('users-model.js', () => {
    describe('add(user)', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        it('should insert provided users into the db', async () => {
            await Users.add({
                username: 'testuser1',
                password: 'password123',
                email: 'testuser1@email.com'
            });

            await Users.add({
                username: 'testuser2',
                password: 'password123',
                email: 'testuser2@email.com'
            });

            const users = await db('users');
            await expect(users).toHaveLength(2);
        });
    });

    describe('update(user)', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        it('should update inserted user', async () => {
            await Users.add({
                username: 'testuser1',
                password: 'password123',
                email: 'testuser1@email.com'
            });

            const { id } = await db('users')
                .where('username', '=', 'testuser1')
                .first();

            await Users.update(id, {
                username: 'testuser1',
                password: 'password123',
                email: 'testuser1updated@email.com'
            });

            const user = await db('users')
                .where('username', '=', 'testuser1')
                .first();

            await expect(user.email).toBe('testuser1updated@email.com');
        });
    });

    describe('remove(user)', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        it('should remove inserted users', async () => {
            await Users.add({
                username: 'testuser1',
                password: 'password123',
                email: 'testuser1@email.com'
            });

            await Users.add({
                username: 'testuser2',
                password: 'password123',
                email: 'testuser2@email.com'
            });

            await Users.remove(1);
            await Users.remove(2);

            const users = await db('users');

            await expect(users).toHaveLength(0);
        });
    });

    describe('find(user)', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        it('should find all users', async () => {
            await Users.add({
                username: 'testuser1',
                password: 'password123',
                email: 'testuser1@email.com'
            });

            await Users.add({
                username: 'testuser2',
                password: 'password123',
                email: 'testuser2@email.com'
            });

            const users = await db('users');

            await expect(users).toEqual([
                {
                    id: 1,
                    username: 'testuser1',
                    password: 'password123',
                    email: 'testuser1@email.com'
                },
                {
                    id: 2,
                    username: 'testuser2',
                    password: 'password123',
                    email: 'testuser2@email.com'
                }
            ]);
        });
    });

    describe('findby(user)', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        it('should find user with username: testuser1', async () => {
            await Users.add({
                username: 'testuser1',
                password: 'password123',
                email: 'testuser1@email.com'
            });

            await Users.add({
                username: 'testuser2',
                password: 'password123',
                email: 'testuser2@email.com'
            });

            const user = await Users.findBy({ username: 'testuser1' });

            await expect(user.username).toBe('testuser1');
        });
    });

    describe('findbyid(user)', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        it('should find user with id: 2', async () => {
            await Users.add({
                username: 'testuser1',
                password: 'password123',
                email: 'testuser1@email.com'
            });

            await Users.add({
                username: 'testuser2',
                password: 'password123',
                email: 'testuser2@email.com'
            });

            const user = await Users.findById(2);

            await expect(user.id).toBe(2);
        });
    });
});