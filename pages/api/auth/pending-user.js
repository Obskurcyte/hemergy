import {connectToDatabase} from "../../../lib/db";
import {hashPassword} from "../../../lib/auth";
import jwt from 'jsonwebtoken'
import axios from 'axios';

async function handler (req, res) {

    if (req.method === 'POST') {
        const {confirmationCode} = req.body;


        const client = await connectToDatabase();
        const db = client.db();

        const existingUser = await db.collection('userspending').findOne({
            confirmationCode: confirmationCode
        });

        res.status(201).json({existingUser : existingUser})
        client.close()

    }

}

export default handler