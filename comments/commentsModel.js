const db = require("../database/dbConfig");

module.exports = {
  getComments,
  getCommentById,
  addComment,
  updateComment,
  deleteComment
};

function getComments(id) {
  return db("comments").where({ activity_id: id });
}

function getCommentById(id) {
  return db("comments").where({ id });
}

async function addComment(comment) {
  const [id] = await db("comments").insert(comment);

  return getCommentById(id);
}

function updateComment(id, changes) {
  return db("comments")
    .where({ id })
    .update(changes, "");
}

function deleteComment() {
  return null;
}
