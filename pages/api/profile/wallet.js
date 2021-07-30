import {connectToDatabase} from "../../../lib/db";

async function handler (req, res) {

    if (req.method === 'POST') {
        const {email, contribution, name} = req.body;

        const client = await connectToDatabase();
        const db = client.db();

        const existingUser = await db.collection('users').findOne({
            email: email
        });

        console.log(existingUser)
        if (existingUser) {
            db.collection('users').updateOne({
                email: email
            }, {
                $set: {
                    contribution: parseInt(existingUser.contribution) + parseInt(contribution)
                }
            })
        } else {
                db.collection('users').insertOne({
                    email,
                    name,
                    contribution
                })
        }
        res.status(201).json({existingUser})
        client.close()
    }

}

export default handler