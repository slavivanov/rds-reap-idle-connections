// Loading and initializing the library:
const pg = require("pg-promise")({
  // Initialization Options
});

// Preparing the connection details:
const connection = `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${
  process.env.DB_PASS
}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;

// Creating a new database instance from the connection details:
const db = pg(connection);

// Exporting the database object for shared use:
module.exports = db;
