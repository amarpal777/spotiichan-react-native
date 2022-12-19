import {authorize} from 'react-native-app-auth';
import {authConfig} from '../../secret.conf';
import {Buffer} from 'buffer';

export async function SpotifyAuth() {
  return await authorize(authConfig);
}

export async function isValidToken(refresh_token: string) {
  return new Promise((resolve, reject) => {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(authConfig.clientId + ':' + authConfig.clientSecret),
      },
      body: 'grant_type=refresh_token&refresh_token=' + refresh_token,
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          reject({
            error: true,
            token: null,
            refresh_token: null,
            desc:"Invalid refresh token"
          });
        } else {
          resolve({
            error: false,
            token: data.access_token,
            refresh_token: data.refresh_token,
          });
        }
      });
  });
}

/**
 *  [Login] isLoggedIn:  true
 {"access_token": "", "scope": "user-read-email user-read-private", "token_type": "Bearer"}
 {"error": "invalid_grant", "error_description": "Invalid refresh token"}
 */

function btoa(str: string) {
  return Buffer.from(str).toString('base64');
}
