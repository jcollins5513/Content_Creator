import express, { Request, Response } from 'express';
import { google } from 'googleapis';
import type { Credentials } from 'google-auth-library';
import { getToken, saveToken, clearTokens, StoredToken } from '../../services/tokenService';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();



const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Attempt to load tokens from persistent storage at startup
const initialTokens = getToken();
if (initialTokens) {
  oAuth2Client.setCredentials(initialTokens);
  console.log('Initial tokens loaded from DB and set for oAuth2Client.');
}

// Listen for token refresh events
oAuth2Client.on('tokens', (newTokens: Credentials) => {
  console.log('oAuth2Client `tokens` event triggered:', newTokens);
  const currentTokens = getToken(); // Get current tokens to preserve refresh_token if not in newTokens
  let updatedTokens: StoredToken;

  if (newTokens.refresh_token) {
    // If a new refresh token is provided, use newTokens as the base
    updatedTokens = {
      access_token: newTokens.access_token!,
      refresh_token: newTokens.refresh_token,
      expiry_date: newTokens.expiry_date || null,
      scope: newTokens.scope || (currentTokens?.scope),
      token_type: newTokens.token_type || (currentTokens?.token_type),
      id_token: newTokens.id_token || (currentTokens?.id_token),
    };
  } else if (currentTokens) {
    // If only an access token is refreshed, update only that part, keep existing refresh_token
    updatedTokens = {
      ...currentTokens,
      access_token: newTokens.access_token!,
      expiry_date: newTokens.expiry_date || null,
      scope: newTokens.scope || currentTokens.scope,
      token_type: newTokens.token_type || currentTokens.token_type,
      id_token: newTokens.id_token || currentTokens.id_token,
    };
  } else {
    console.warn('Tokens event fired but no current tokens found and no new refresh token. Storing new tokens as is.');
    updatedTokens = {
        access_token: newTokens.access_token!,
        refresh_token: null, 
        expiry_date: newTokens.expiry_date || null,
        scope: newTokens.scope || undefined,
        token_type: newTokens.token_type || undefined,
        id_token: newTokens.id_token || undefined,
    };
  }
  saveToken(updatedTokens);
  oAuth2Client.setCredentials(updatedTokens);
  console.log('Tokens updated in DB and oAuth2Client after refresh:', updatedTokens);
});

// 1. Redirect user to Google's consent screen
router.get('/auth', (req: Request, res: Response) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // Ensures we get a refresh token
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
    prompt: 'consent', // Important to get a refresh token on first auth, and on subsequent if it was revoked
  });
  res.redirect(authUrl);
});

// 2. Handle the OAuth 2.0 server response
router.get('/auth/callback', async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Authorization code is missing');
  }
  try {
    const { tokens: newTokensFromGoogle } = await oAuth2Client.getToken(code as string);
    // Store all tokens, including the refresh_token
    saveToken(newTokensFromGoogle as StoredToken);
    console.log('Tokens acquired successfully and saved to DB:', newTokensFromGoogle);
    // Set credentials for the oAuth2Client immediately after acquiring them
    // This ensures the client has the refresh token for future auto-refresh
    oAuth2Client.setCredentials(newTokensFromGoogle); 
    res.redirect('http://localhost:5173'); // Redirect to your frontend
  } catch (error) {
    console.error('Error acquiring tokens:', error);
    res.status(500).send('Failed to acquire tokens');
  }
});

// 3. Fetch calendar events
router.get('/events', async (req: Request, res: Response) => {
  const currentTokens = getToken();
  if (!currentTokens || !currentTokens.access_token) { // Check for access_token specifically
    return res.status(401).json({ message: 'User not authenticated or access token missing. Please authenticate via /api/calendar/auth' });
  }

  // Set credentials before every API call that might need auth.
  // The oAuth2Client will handle refreshing if the access_token is expired,
  // provided it has a refresh_token.
  oAuth2Client.setCredentials(currentTokens); 
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    res.json(response.data.items);
  } catch (error: any) { // Explicitly type error as any or a more specific error type
    console.error('The API returned an error:', error.message);
    // Check if the error is due to an invalid token (e.g., expired and refresh failed)
    if (error.code === 401 || (error.response && error.response.status === 401)) {
      console.log('Authentication error (401) encountered. Clearing stored tokens.');
      // Clear tokens to force re-authentication
      clearTokens(); 
      return res.status(401).json({ message: 'Authentication error. Please log in again.' });
    }
    res.status(500).json({ message: 'Failed to fetch calendar events', error: error.message });
  }
});

export default router;

