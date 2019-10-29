// Update with your config settings.

module.exports = {
  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/db."
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  testing: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/test.db3"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
