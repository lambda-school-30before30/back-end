exports.seed = function(knex, promise) {
  return knex("users").insert([
    { username: "Brey", password: "test123", email: "brey@backend.com" },
    { username: "Sammy", password: "test123", email: "sammy@backend.com" },
    { username: "Braden", password: "test123", email: "braden@backend.com" }
  ]);
};
