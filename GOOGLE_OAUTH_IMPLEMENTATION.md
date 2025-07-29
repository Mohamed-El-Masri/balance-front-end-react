# Google OAuth Implementation Guide

## Overview
This project implements Google OAuth 2.0 authentication using a hybrid approach:
1. **Primary**: Google Identity Services API (One Tap + Popup)
2. **Fallback**: Direct OAuth 2.0 flow with custom popup handling

## Implementation Details

### Architecture
- **Service Layer**: `src/services/googleAuth.ts` - Main OAuth service
- **UI Integration**: Sign-in and Sign-up pages with Google buttons
- **Callback Handler**: `src/components/auth/GoogleAuthCallback.tsx` - Processes OAuth redirects
- **Routing**: Custom route `/auth/google/callback` for OAuth processing

### Authentication Flow

#### Primary Flow (Google Identity Services)
1. Load Google Identity Services script
2. Initialize with client ID
3. Attempt One Tap sign-in (automatic)
4. Fallback to popup sign-in if One Tap fails
5. Process JWT token and extract user information

#### Fallback Flow (Direct OAuth)
1. Open popup window with Google OAuth URL
2. User authenticates in popup
3. Google redirects to callback URL with ID token
4. Callback component processes token and sends to parent window
5. Parent window receives token and continues authentication

### Required Configuration

#### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable Google+ API and Google Identity services
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure application:
   - **Application type**: Web application
   - **Name**: Balance Real Estate (or your app name)
   - **Authorized JavaScript origins**: 
     - `http://localhost:5173` (development)
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:5173/auth/google/callback` (development)
     - `https://yourdomain.com/auth/google/callback` (production)

#### 2. Environment Variables
Create `.env` file in project root:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.googleusercontent.com
```

### Security Features

#### Token Validation
- JWT signature verification
- Issuer validation (Google)
- Audience validation (your client ID)
- Expiration time checking
- User information extraction

#### Error Handling
- Client ID validation
- Network error handling
- Popup blocker detection
- User cancellation handling
- Timeout management

### Browser Compatibility

#### Supported Browsers
- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

### Troubleshooting

#### Common Issues

**1. Error 401: invalid_client**
- Verify client ID in `.env` file
- Check authorized origins in Google Cloud Console
- Ensure client ID format is correct (ends with .googleusercontent.com)

**2. Popup Blocked**
- Ensure user interaction triggers the sign-in (button click)
- Add site to browser's popup exception list
- Use HTTPS in production

**3. Redirect URI Mismatch**
- Verify redirect URIs in Google Cloud Console
- Check callback route is correctly configured
- Ensure exact URL match (including protocol)

### Testing

#### Development Testing
1. Start development server: `npm run dev`
2. Navigate to sign-in page
3. Click "Continue with Google"
4. Complete authentication flow
5. Verify user information is received

#### Production Testing
1. Deploy application
2. Update Google Cloud Console with production URLs
3. Test authentication flow
4. Monitor browser console for errors

---

**Last Updated**: December 2024  
**Version**: 2.0.0
