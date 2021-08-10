import nodemailer from 'nodemailer';
import {useRouter} from "next/router";
import {connectToDatabase} from "../../lib/db";
import {hashPassword} from "../../lib/auth";


const handler = async (req, res) => {

    const {name, confirmationCode, email, password} = req.body
    if (req.method === 'POST') {
        const output = `
<h2>Hello !</h2>
<p>Thank you for subscribing. Please confirm your email by clicking on the following link<p/>
 <a href=http://localhost:3000/started> Click here</a>
`

        const client = await connectToDatabase();
        const db = client.db();


        const createdUser = await db.collection('userspending').insertOne({
            name,
            email,
            password: password,
            projects: [],
            contribution: 0,
            confirmationCode: confirmationCode
        });


        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: 'dev.hemergy@gmail.com', // generated ethereal user
                    pass: 'Hello13012'
                },
            });

            // send mail with defined transport object
            let info = transporter.sendMail({
                from: `${req.body.email}`, // sender address
                to: "hadrien.jaubert99@gmail.com",  // list of receivers
                subject: "[Confirmation Email]", // Subject line
                text: "", // plain text body
                html: output, // html body,
            });

            console.log("Message sent: %s", info.messageId);

        } catch(err) {
            console.log(err)
        }

        res.json({createdUser})
    }
};

export default handler;