import { NextResponse } from 'next/server';

export async function GET() {
  
  const clientId = '1249591168451215391';
  const redirectUri = 'https://verify.exodusv.site/authentication/callback/discord';
  const redirectUrl = `https://discord.com/oauth2/authorize?response_type=code&client_id=${clientId}&scope=identify&state=123456&redirect_uri=${redirectUri}&prompt=consent`;

  console.log(`Returning url: ${redirectUrl}`)
  return NextResponse.redirect(redirectUrl);
}
