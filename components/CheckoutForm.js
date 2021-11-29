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
    console.log('dataUser', dataUser)

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
            <div className="stepContainer2 mb-5 mt-5">
                <h3 className="purpleTitle mb-3">Done !</h3>
                <div className="flex mb-4">
                    <img src={'/HeartCarre.png'} alt=""/>
                    <h4 className="mt-3 ml-3">Thanks for your contribution !</h4>
                </div>
                <PurpleButton title="Go to your wallet" onClick={async () => await router.push('/wallet')} href="javascript:void(0)"/>
            </div>
        </div>
    );
};

export default CheckoutForm;
