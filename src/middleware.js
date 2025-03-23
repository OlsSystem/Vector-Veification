// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const cookies = req.cookies;

  if (!cookies.state || !cookies.nonce) {
    return NextResponse.redirect('/error'); // Redirect to an error page or handle accordingly
  }

  // Attach cookies to the request for the API route
  req.cookies = {
    nonce: cookies.nonce,
    state: cookies.state,
    discordId: cookies.discordId,
  };

  return NextResponse.next();
}

export const config = {
    matcher: ['/api/callback/roblox'], // List specific routes
  };
  