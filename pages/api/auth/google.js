import {connectToDatabase} from "../../../lib/db";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';


async function handler (req, res, next) {

    if (req.method === 'POST') {

        const client = await connectToDatabase();
        const db = client.db();

        passport.use(
            new GoogleStrategy({
                    callbackURL: '/api/auth/callback/google',
                    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
                    clientSecret: `${process.env.GOOGLE_SECRET_ID}`
        }, () => {

            }
        ))

        passport.authenticate('google', {
            scope: ['profile']
        })
    }

}

export default handler