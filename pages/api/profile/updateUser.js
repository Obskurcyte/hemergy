import {connectToDatabase} from "../../../lib/db";
import {hashPassword} from "../../../lib/auth";

async function handler (req, res) {

    if (req.method === 'POST') {
        const {email, phone, name, adress, newEmail, password} = req.body;

        const client = await connectToDatabase();
        const db = client.db();

        const existingUser = await db.collection('users').findOne({
            email: email
        });

        const hashedPassword = await hashPassword(password);

        await db.collection('users').updateOne({
                email: email
            }, {
                $set: {
                    email: newEmail,
                    phone,
                    name,
                    adress,
                    hashedPassword
                }
            })

        res.status(201).json({existingUser})
        client.close()
    }

}

export default handler