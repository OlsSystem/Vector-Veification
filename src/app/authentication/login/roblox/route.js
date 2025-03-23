import { NextResponse } from 'next/server';
import { Issuer } from 'openid-client';
import { v4 as uuidv4 } from 'uuid';
import { serialize } from 'cookie';

const mainurl = 'https://verify.exodusv.site';

export async function GET(req) {
  const issuer = await Issuer.discover('https://apis.roblox.com/oauth/.well-known/openid-configuration');
  const client = new issuer.Client({
    client_id: process.env.ROBLOX_CLIENT_ID,
    client_secret: process.env.ROBLOX_CLIENT_SECRET,
    redirect_uris: [`${mainurl}/authentication/callback/roblox`],
    response_types: ['code'],
    scope: 'openid profile',
    id_token_signed_response_alg: 'ES256',
  });

  const nonce = uuidv4();

  // Create the authorization URL
  const authorizationUrl = client.authorizationUrl({
    scope: 'openid profile',
    nonce,
  });

  // Create the response object
  const response = NextResponse.redirect(authorizationUrl);

  // Set the nonce in a cookie
  response.headers.append('Set-Cookie', serialize('nonce', nonce, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' }));

  return response;
}
