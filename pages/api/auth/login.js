import {connectToDatabase} from "../../../lib/db";
import {hashPassword, verifyPassword} from "../../../lib/auth";
import jwt from 'jsonwebtoken';

async function handler (req, res, next) {

    if (req.method === 'POST') {
        const {email, password} = req.body;



        const client = await connectToDatabase();
        const db = client.db();

        let existingUser;
        try {
            existingUser = await db.collection('users').findOne({
                email: email
            });
        } catch (err) {
            const error = new Error("This user was not found");
            return next(error)
        }

        const isValid = await verifyPassword(password, existingUser.password)
        if (!existingUser || !isValid) {
            const error = new Error('Invalid creadentials, could not log you in !')
            return next(error)
        }


        let token;
        try {
            token = jwt.sign(
                {userId: existingUser.id,
                    email: existingUser.email,
                    name: existingUser.name
                },
                'hemergysecretkey',
                {expiresIn: "365d"}
            );
        } catch (err) {
            console.log(err)
        }


        res.status(201).json({
            userId: existingUser.id,
            email: existingUser.email,
            token: token,
            name: existingUser.name
        })
        client.close()

    }

}

export default handler