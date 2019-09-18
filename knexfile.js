// Update with your config settings.

module.exports = {
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
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env["postgres://utbokzicloyckp:c7ad3429a995a674d88a89daae16af98775d27dc055aa9d03b491b7995f6c90f@ec2-174-129-227-80.compute-1.amazonaws.com:5432/da1b8kecu16b9e"],
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
