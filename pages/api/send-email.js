import nodemailer from 'nodemailer';
import {useRouter} from "next/router";


const handler = (req, res) => {
    const {nom, email, message} = req.body
    if (req.method === 'POST') {
        const output = `
<p>Vous avez une nouvelle demande par email<p/>
<h3>Voici les détails : </h3>
<ul>
<li>Nom : ${nom}</li>
<li>Email : ${email}</li>
<h3>Message</h3>
<p>${message}</p>
</ul>
`

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
        subject: "[Nouvelle demande de contact]", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body,
    });



    console.log("Message sent: %s", info.messageId);
} catch(err) {
            console.log(err)
}


    }
};

export default handler;