const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
};

function find() {
    return db('activities').select('id', 'title', 'description', 'isCompleted', 'isPublic');
}

function findBy(filter) {
    return db('activities').where(filter);
}

async function add(activity) {
    const [id] = await db('activities').insert(activity);
    return findById(id);
}

function findById(id) {
    return db('activities')
        .where({ id })
        .first();
}

function update(id, changes) {
    return db('activities')
        .where('id', id)
        .update(changes)
}

function remove(id) {
    return db('activities')
        .where('id', id)
        .del();
}