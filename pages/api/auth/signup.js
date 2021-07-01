import {connectToDatabase} from "../../../lib/db";
import {hashPassword} from "../../../lib/auth";

async function handler (req, res) {

    if (req.method === 'POST') {
        const {name, email, password} = req.body;

        if (!email || !email.includes('@') || !name || !password || password.trim().length < 7) {
            res
                .status(422)
                .json({
                    message: 'Invalid input - password should be 7 characters long'
                })
            return;
        }
        const client = await connectToDatabase();
        const db = client.db();

        const existingUser = await db.collection('users').findOne({
            email: email
        });

        if (existingUser) {
            res.status(422).json({message: 'User already exists'})
            await client.close()
            return;
        }

        const hashedPassword = await hashPassword(password);

        await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({message: 'Created User'})
        await client.close()

    }

}

export default handler