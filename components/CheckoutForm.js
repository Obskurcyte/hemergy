import React, { useState } from "react";
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
import {Row} from 'react-bootstrap';

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

const CheckoutForm = ({ price, onSuccessfulCheckout, isPaymentDone }) => {
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
    const [done, setDone] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    console.log(isPaymentDone)
    // TIP
    // use the cardElements onChange prop to add a handler
    // for setting any errors:

    const handleCardDetailsChange = ev => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };

    // Learning
    // A common ask/bug that users run into is:
    // How do you change the color of the card element input text?
    // How do you change the font-size of the card element input text?
    // How do you change the placeholder color?
    // The answer to all of the above is to use the `style` option.
    // It's common to hear users confused why the card element appears impervious
    // to all their styles. No matter what classes they add to the parent element
    // nothing within the card element seems to change. The reason for this is that
    // the card element is housed within an iframe and:
    // > styles do not cascade from a parent window down into its iframes

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

    //creation of payment intent


    return (
        <Formik
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
                        return;
                    }

                    window.location.reload()
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

        </Formik>
    );
};

export default CheckoutForm;