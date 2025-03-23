import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Issuer } from 'openid-client';
import mongoose from 'mongoose';
import User from '../../../models/User';
import { URL } from 'url';
import { jwtDecode } from 'jwt-decode';

const mainurl = 'https://verify.exodusv.site';

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  }
};

export async function GET(req, res) {
  await connectDB();
  console.log('ROBLOX CALLBACK');

  const issuer = await Issuer.discover('https://apis.roblox.com/oauth/.well-known/openid-configuration');
  const client = new issuer.Client({
    client_id: process.env.ROBLOX_CLIENT_ID,
    client_secret: process.env.ROBLOX_CLIENT_SECRET,
    redirect_uris: [`${mainurl}/authentication/callback/roblox`],
    response_types: ['code'],
    scope: 'openid profile',
    id_token_signed_response_alg: 'ES256',
  });


  const nonceCookie = req.cookies.get('nonce');
  const params = client.callbackParams(req);

  console.log('Nonce Cookie:', nonceCookie, 'Params:', params);

  try {
    const tokenSet = await client.callback(`${mainurl}/authentication/callback/roblox`, params, {
      nonce: nonceCookie.value,
    });

    console.log('Token Set');

    if (!tokenSet) {
      throw new Error('Token set is empty');
    }

    const token = tokenSet.id_token;

    const decodedToken = jwtDecode(token);

    const robloxId = decodedToken.sub;
    const discordId = req.cookies.get('discordId').value;

    console.log('Roblox ID:', robloxId, 'Discord ID:', discordId);

    const alreadyVerified = await User.findOne({ discordId: discordId, robloxId: robloxId})

    if (alreadyVerified) {
      return NextResponse.redirect(`${mainurl}/already`)
    }

    const user = new User({
      discordId,
      robloxId,
      activityArray: [],
      applicationHistory: [],
    });

    await user.save();

    return NextResponse.redirect(`${mainurl}/success`);

  } catch (error) {
    console.error('Error during callback:', error);
    return new Response('An error occurred during the Roblox login process.', { status: 500 });
  }
}
