import {connectToDatabase} from "../../../lib/db";

async function handler (req, res) {

    if (req.method === 'POST') {
        const {email} = req.body;

        const client = await connectToDatabase();
        const db = client.db();

        const existingUser = await db.collection('users').findOne({
            email: email
        });

        res.status(201).json({existingUser})
        client.close()
    }

}

export default handler