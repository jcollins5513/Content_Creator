import db from '../db';
import { Credentials } from 'google-auth-library';

export interface StoredToken extends Credentials {
  // Credentials already includes access_token, refresh_token, expiry_date, scope, token_type
  // No need to redefine them here unless you want to make them non-optional or change types
}

const TOKEN_ROW_ID = 1; // Fixed ID for the single token entry

export const saveToken = (token: StoredToken): void => {
  const stmt = db.prepare(`
    INSERT INTO google_tokens (id, access_token, refresh_token, expiry_date, scope, token_type)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      access_token = excluded.access_token,
      refresh_token = excluded.refresh_token,
      expiry_date = excluded.expiry_date,
      scope = excluded.scope,
      token_type = excluded.token_type;
  `);
  stmt.run(
    TOKEN_ROW_ID,
    token.access_token,
    token.refresh_token || null, // Ensure refresh_token is null if undefined
    token.expiry_date || null,
    token.scope || null,
    token.token_type || null
  );
  console.log('Token saved to database.');
};

export const getToken = (): StoredToken | null => {
  const stmt = db.prepare('SELECT * FROM google_tokens WHERE id = ?');
  const token = stmt.get(TOKEN_ROW_ID) as StoredToken | undefined;
  if (token) {
    console.log('Token retrieved from database.');
    // Ensure numeric fields are numbers if they come from DB as strings/numbers
    if (token.expiry_date) token.expiry_date = Number(token.expiry_date);
    return token;
  }
  console.log('No token found in database.');
  return null;
};

export const clearTokens = (): void => {
  const stmt = db.prepare('DELETE FROM google_tokens WHERE id = ?');
  stmt.run(TOKEN_ROW_ID);
  console.log('Tokens cleared from database.');
};
