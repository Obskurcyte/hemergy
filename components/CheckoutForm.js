import React, {useEffect, useState} from "react";
import {
    CardElement,
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";
import PurpleButton from "./PurpleButton";
import WhiteButton from "./WhiteButton";
import {Formik} from 'formik'
import {useRouter} from "next/router";

const CardElementContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout, isPaymentDone, contribution, id }) => {
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
    const [done, setDone] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const [dataUser, setDataUser] = useState(null);

    const router = useRouter()
    useEffect(() => {
        if ( process.browser) {
            let userData = localStorage.getItem('userDataHemergy');
            const trueData = JSON.parse(userData);
            setDataUser(trueData)
        }
    }, []);
    console.log(dataUser)

    const [paymentDone, setIsPaymentDone] = useState(false);
    // TIP
    // use the cardElements onChange prop to add a handler
    // for setting any errors:

    const handleCardDetailsChange = ev => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };

    const iframeStyles = {
        base: {
            color: "black",
            fontSize: "16px",
            fontFamily: "Poppins-Regular, sans-serif",
            iconColor: "#fff",
            "::placeholder": {
                color: "\n" +
                    "#AE9ABA",
                fontFamily: "Poppins-Regular, sans-serif",
                content: "Numéro de carte"
            }
        },
        invalid: {
            iconColor: "#FFC7EE",
            color: "red"
        },
        complete: {
            iconColor: "#cbf4c9",
            color: "green"
        }
    };

    const cardElementOpts = {
        placeholder: 'Credit Card Number',
        iconStyle: "solid",
        style: iframeStyles,
        hidePostalCode: true
    };

    const cardElementOpts2 = {
        placeholder: 'Validity',
        iconStyle: "solid",
        style: iframeStyles,
        hidePostalCode: true
    };

    const cardElementOpts3 = {
        placeholder: 'CVV',
        iconStyle: "solid",
        style: iframeStyles,
        hidePostalCode: true
    };

    console.log('contrib', contribution)
    console.log(paymentDone)
    return (
        <div>
        {paymentDone ?
            <div className="stepContainer2 mb-5 mt-5">
                <h3 className="purpleTitle mb-3">Done !</h3>
                <div className="flex mb-4">
                    <img src={'/HeartCarre.png'} alt=""/>
                    <h4 className="mt-3 ml-3">Thanks for your contribution !</h4>
                </div>
                <PurpleButton title="Go to your wallet" onClick={async () => await router.push('/wallet')} href="javascript:void(0)"/>
            </div> : <Formik
                initialValues={{
                    name: '',
                    cardNumber: ''
                }}
                onSubmit={async (values) => {

                    const cardValues = {
                        card: values.cardNumber,
                        name: values.name
                    }

                    console.log(values)

                    localStorage.setItem('cardName', values.name)

                    setProcessingTo(true);

                    const cardElement = elements.getElement("cardNumber");

                    try {
                        const { data: clientSecret } = await axios.post("/api/payment_intents", {
                            amount: price * 100
                        });

                        const paymentMethodReq = await stripe.createPaymentMethod({
                            type: "card",
                            card: cardElement,
                        });

                        try {
                            const response =  await axios.post('/api/profile/wallet', {
                                email: dataUser.email,
                                name: dataUser.name,
                                contribution: 30
                            })
                                console.log('contribuback', contribution)
                            console.log('response', response)
                            setIsPaymentDone(true)
                        } catch (err) {
                            console.log(err)
                        }
                        try {
                            const response = await axios.post('api/projects/update-project', {
                                id: id,
                                contribution
                            })
                            console.log(response)
                        } catch (err) {
                            console.log(err)
                        }

                        try {
                            const response = await axios.post('api/projects/add-project-to-user', {
                                id: id,
                                name: dataUser.name,
                            })
                            console.log(response)
                        } catch (err) {
                            console.log(err)
                        }

                        console.log(paymentMethodReq)
                        if (paymentMethodReq.error) {
                            setCheckoutError(paymentMethodReq.error.message);
                            setProcessingTo(false);
                            return;
                        }
                        const { error } = await stripe.confirmCardPayment(clientSecret, {
                            payment_method: paymentMethodReq.paymentMethod.id
                        });
                        if (error) {
                            setCheckoutError(error.message);
                            setProcessingTo(false);
                        }
                    } catch (err) {
                        console.log(err)
                        setCheckoutError(err.message);
                    }
                }}
            >
                {props => (
                    <form className="checkoutForm">
                        <div className="formContainer">
                            <CardElementContainer>
                                <div className="creditCardInput flex pl-3">
                                    <img src={'/creditCard.png'} alt="" className='img-form'/>
                                    <CardNumberElement
                                        options={cardElementOpts}
                                        value={props.values.cardNumber}
                                        onChange={props.handleChange('cardNumber')}
                                    />

                                </div>

                                <div className="creditCardInput flex pl-3 pt-2 pb-2">
                                    <img src={'/Profile.png'} alt="" className='img-checkout'/>
                                    <input
                                        type="text"
                                        placeholder="Cardholder name"
                                        className="inputCheckout mt-1 mb-1"
                                        value={props.values.name}
                                        onChange={props.handleChange('name')}
                                    />
                                </div>

                                <div className="flex justify-content-between expiry-container">
                                    <div className="creditCardInputMini flex pl-3">
                                        <img src={'/Calendar.png'} alt="" className='img-form-mini'/>
                                        <CardExpiryElement
                                            options={cardElementOpts2}
                                            onChange={handleCardDetailsChange}
                                        />
                                    </div>

                                    <div className="creditCardInputMini flex pl-3">
                                        <img src={'/Lock.png'} alt="" className='img-form-mini'/>
                                        <CardCvcElement
                                            options={cardElementOpts3}
                                            onChange={handleCardDetailsChange}
                                        />
                                    </div>
                                </div>

                            </CardElementContainer>
                        </div>
                        {/* TIP always disable your submit button while processing payments */}
                        <div className="flex justify-content-between mt-4">
                            <PurpleButton title="Payment" id="pay-button" href="javascript:void(0)" onClick={props.handleSubmit}/>
                            <WhiteButton title="Back" id='back-button'/>
                        </div>
                    </form>
                )}

            </Formik>}

        </div>
    );
};

export default CheckoutForm;