import { NextResponse } from 'next/server';


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const mainurl = 'https://verify.exodusv.site'

  try {
    console.log(`Code Recieved: ${code}`)
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'client_id': process.env.DISCORD_CLIENT_ID,
        'client_secret': process.env.DISCORD_SECRET,
        'grant_type': 'authorization_code',
        'redirect_uri': mainurl + "/authentication/callback/discord",
        'code': code,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();
    console.log(userData)
    const discordId = userData.id;


    const response = NextResponse.redirect(`${mainurl}/redirect`);
    response.cookies.set('discordId', discordId, { path: '/', httpOnly: true, secure: true });

    console.log('responding', response)

    return response;
  } catch (error) {
    console.error(error);
    return new Response('An error occurred during the Discord login process.', { status: 500 });
  }
}
