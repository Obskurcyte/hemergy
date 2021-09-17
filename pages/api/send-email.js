import nodemailer from 'nodemailer';
import {useRouter} from "next/router";


const handler = async (req, res) => {
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
        host: 'smtp.centrale-marseille.fr',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'hadrien.jaubert@centrale-marseille.fr', // generated ethereal user
            pass: 'Hello13012'
        },
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    await new Promise((resolve, reject) => {
        // send mail with defined transport object
        transporter.sendMail({
            from: "contact@maxandlea.com", // sender address
            to: "hadrien.jaubert99@gmail.com",  // list of receivers
            subject: "Nouvelle demande de contact",
            text: "Hello world?", // plain text body
            html: output, // html body,
        });
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({status: "OK"})
    // send mail with defined transport object
  /*  let info = transporter.sendMail({
        from: `${req.body.email}`, // sender address
        to: "hadrien.jaubert99@gmail.com",  // list of receivers
        subject: "[Nouvelle demande de contact]", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body,
    });


   */




} catch(err) {
            console.log(err)
}


    }
};

export default handler;