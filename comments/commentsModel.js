const db = require("../database/dbConfig");

module.exports = {
  getComments,
  addComment,
  updateComment,
  deleteComment
};

function getComments(id) {
  return db("comments").where({ activity_id: id });
}

function addComment() {
  return null;
}

function updateComment() {
  return null;
}

function deleteComment() {
  return null;
}
