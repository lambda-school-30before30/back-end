const db = require('../database/dbConfig.js');

module.exports = {
    add,
    update,
    remove,
    find,
    findBy,
    findById
};

function find() {
    return db('users').select('id', 'username');
}

function findBy(filter) {
    return db('users')
        .where(filter)
        .first();
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

async function add(user) {
    const [id] = await db('users').insert(user);
    return findById(id);
}

async function update(id, user) {
    return db('users')
        .update(user)
        .where({ id });
}

async function remove(id) {
    return db('users')
        .where({ id })
        .del();
}
