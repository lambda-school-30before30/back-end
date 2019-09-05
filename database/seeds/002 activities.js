exports.seed = function(knex) {
  return knex("activities").insert([
    {
      user_id: 1,
      title: "breys test title",
      description: "breys test desc",
      link: "google.com",
      budget: 500
    },
    {
      user_id: 2,
      title: "sammys test title",
      description: "sammys test desc",
      link: "google.com",
      budget: 501
    },
    {
      user_id: 3,
      title: "bradens test title",
      description: "bradens test desc",
      link: "google.com",
      budget: 502
    }
  ]);
};
