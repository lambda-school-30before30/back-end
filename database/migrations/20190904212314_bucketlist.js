exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users
        .string("username", 128)
        .notNullable()
        .unique();
      users.string("password", 128).notNullable();
      users
        .string("email", 128)
        .notNullable()
        .unique();
    })
    .createTable("activities", activity => {
      activity.increments();
      activity.string("title", 128).notNullable();
      activity.string("description", 255);
      activity.string("link", 128);
      activity.integer("budget");
      activity
        .boolean("isCompleted")
        .notNullable()
        .defaultTo(false);
      activity
        .boolean("isPublic")
        .notNullable()
        .defaultTo(false);
      activity.date("deadline");
      activity
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("comments", comments => {
      comments.increments();
      comments.string("comment", 255).notNullable();
      comments
        .integer("activity_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("activities")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      comments
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("activities")
    .dropTableIfExists("users");
};
