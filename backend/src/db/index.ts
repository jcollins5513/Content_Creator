import Database from 'better-sqlite3';
import path from 'path';

// Define the path to the database file. It will be created in the project root for simplicity.
// For a production app, you might want to place it in a more appropriate data directory.
const dbPath = path.resolve(__dirname, '..', '..', 'app_tokens.db');

const db = new Database(dbPath, { verbose: console.log });

// Initialize the database schema
const initSchema = () => {
  const createTableStmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS google_tokens (
      id INTEGER PRIMARY KEY DEFAULT 1, -- Assuming only one set of tokens will be stored
      access_token TEXT NOT NULL,
      refresh_token TEXT,
      expiry_date INTEGER, -- Store as Unix timestamp (milliseconds)
      scope TEXT,
      token_type TEXT
    );
  `);
  createTableStmt.run();
  console.log('Database schema initialized. `google_tokens` table is ready.');
};

initSchema();

export default db;
