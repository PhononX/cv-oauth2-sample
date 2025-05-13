# Carbon Voice OAuth2 Demo

This is a Next.js application that demonstrates the OAuth2 authentication flow with Carbon Voice. The application includes a public home page and a private dashboard that can only be accessed after successful authentication.

## Features

- OAuth2 authentication flow with Carbon Voice
- Protected dashboard route
- Token management (access token and refresh token)
- User information retrieval

## OAuth2 Flow

The application implements the Authorization Code flow with the following steps:

1. User clicks "Sign in with Carbon Voice" on the home page
2. User is redirected to Carbon Voice's authorization endpoint
3. After authorizing, user is redirected back to our application with an authorization code
4. The application exchanges the code for an access token
5. The access token is stored and used for subsequent API calls
6. The refresh token can be used to obtain new access tokens when needed

## API Endpoints

### Carbon Voice Endpoints

- Authorization: `https://api.carbonvoice.app/oauth/authorize`
  - Method: GET
  - Parameters:
    - `client_id`: Your client ID
    - `redirect_uri`: Your callback URL
    - `response_type`: "code"

- Token Exchange: `https://api.carbonvoice.app/oauth/token`
  - Method: POST
  - Content-Type: application/x-www-form-urlencoded
  - Parameters:
    - `grant_type`: "authorization_code" or "refresh_token"
    - `client_id`: Your client ID
    - `code`: Authorization code (for authorization_code grant)
    - `redirect_uri`: Your callback URL (for authorization_code grant)
    - `refresh_token`: Refresh token (for refresh_token grant)

- User Info: `https://api.carbonvoice.app/whoami`
  - Method: GET
  - Headers:
    - `Authorization`: Bearer {access_token}

### Application Endpoints

- Home: `/`
  - Public page with sign-in button

- Dashboard: `/dashboard`
  - Protected page with token management
  - Requires valid access token

- API Routes:
  - `/api/token`: Handles token exchange
  - `/api/whoami`: Proxies user info requests

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd sign-in-cv
```

2. Install dependencies:
```bash
npm install
```

3. Configure your environment:
   - Update `src/constants.ts` with your credentials:
     ```typescript
     export const CLIENT_ID = 'your-client-id';
     export const REDIRECT_URI = 'http://localhost:3003';
     export const BASE_URL = 'https://api.carbonvoice.app';
     ```

4. Start the development server:
```bash
npm run dev
```

5. Visit `http://localhost:3003` in your browser

## Testing with Different Client IDs

To test the application with different client IDs:

1. Update the `CLIENT_ID` in `src/constants.ts`
2. Make sure the `REDIRECT_URI` matches the one registered for your client ID
3. Restart the development server
4. Clear your browser's local storage to remove any existing tokens
5. Try the authentication flow with the new client ID

## Token Management

The application provides three main functions in the dashboard:

1. **Get New Access Token**
   - Uses the authorization code to get a new access token
   - Stores both access token and refresh token

2. **Get Refresh Token**
   - Uses the existing refresh token to get a new access token
   - Updates the stored tokens

3. **User Info**
   - Uses the current access token to fetch user information
   - Displays the user data in a formatted view

## Security Notes

- Access tokens and refresh tokens are stored in the browser's localStorage
- The application uses HTTPS for all API calls
- Tokens are automatically cleared when the user is not authenticated
- The dashboard is protected and only accessible with a valid access token

## Development

Built with:
- Next.js 14
- TypeScript
- Tailwind CSS
- React