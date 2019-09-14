exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("comments").insert([
    { comment: "breys test comment", activity_id: 1, user_id: 1 },
    { comment: "sammys test comment", activity_id: 2, user_id: 2 },
    { comment: "bradens test comment", activity_id: 3, user_id: 3 }
  ]);
};
