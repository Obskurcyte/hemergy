import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const EmailConfirmation = () => {

  /*  const router = useRouter()
    const email = router.query.email;
    const name = router.query.name
    console.log(router.query)

    useEffect(() => {
        const sendEmail = async () => {
            await axios.post('/api/send-confirmation-email', {
                nom: name
            })
        }
        sendEmail()
    }, []);

   */
    return (
        <div>
            <Header />
            <h1 className="verify-email">Verify your email inbox</h1>
            <p className="email-confirmation-text">An email has been sent to <span className="username-confirm">woa</span> </p>
            <p className="email-confirmation-text mb-3">Hit confirm and you'll be ready to start working.</p>

            <p className="email-confirmation-text mb-5">Didn't see an email ? <span className="resend">Resend</span></p>


            <div className="img-confirmation-container">
                <img src={'/email-ordi.png'} alt=""/>
            </div>


            <Footer />
        </div>
    );
};

export default EmailConfirmation;