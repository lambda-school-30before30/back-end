const db = require('../database/dbConfig');

module.exports = {
    add,
    getActivities,
    findBy,
    findById,
    update,
    remove
};

function getActivities() {
    return db('activities').select('id', 'title', 'description');
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
        .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
    return db('activities')
        .where('id', id)
        .del();
}