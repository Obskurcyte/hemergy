import {connectToDatabase} from "../../../lib/db";
import {hashPassword} from "../../../lib/auth";
import jwt from 'jsonwebtoken'
import axios from 'axios';

async function handler (req, res) {

    if (req.method === 'POST') {
        const {name, email, password} = req.body;

        console.log(req.body)
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
            client.close()
            return;
        }

        const hashedPassword = await hashPassword(password);

        let token;


        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 25; i++) {
            code += characters[Math.floor(Math.random() * characters.length )];
        }

        let createdUser
        try {
            createdUser = await db.collection('users').insertOne({
                name,
                email,
                password: hashedPassword,
                projects: [],
                contribution: 0,
                confirmationCode: code
            });
        } catch(err) {
            console.log(err)
        }

        try {
            token = jwt.sign(
                {userId: createdUser.id, email: createdUser.email},
                'hemergysecretkey',
                {expiresIn: "365d"}
            );
        } catch (err) {
            console.log(err)
        }
        console.log(createdUser)

        res.status(201).json({name: createdUser.ops[0].name, token: token, email: createdUser.ops[0].email})
        client.close()

    }

}

export default handler
