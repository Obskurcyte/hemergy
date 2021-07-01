import React, {useState, useEffect} from 'react';
import Header from "../components/Header";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import Footer from "../components/Footer";
import PurpleButton from "../components/PurpleButton";
import router from "next/router";
const stripePromise = loadStripe('pk_test_51J4pECI6Kpzdhe1HCOwhZk9uH92AZYqCrsF8cZ4hHhr0GMKddhTIYlc7sLdedMOrDyBhbQVTWU92p9KzbWGWhANI00tKILqD8D');


const Checkout = (props) => {

    let isPaymentDone = false

    const [name, setName] = useState('')
   /* useEffect(() => {
        if ( process.browser) {
            let cartData = localStorage.getItem('cardName');
            const trueData = JSON.parse(cartData);
            setName(trueData)
            console.log(trueData)
        }
    }, []);

    */
    useEffect(() => {
        if (process.browser) {
            let cartData = localStorage.getItem('cardName');
            setName(cartData)
            console.log(cartData)
        }
    })

    const goToWallet = () => {
        localStorage.removeItem('cardName')
    }

     return (
        <div>
            <Header />
            <h1 className='headTitleLog'>Contribution</h1>
            <div className="checkoutContainer">
                <div className="stepContainer mb-5">
                    <h3 className="checkoutInnerTitle mb-3">Set contribution</h3>
                    <div className="flex justify-content-between">
                        <div className="yourContribution flex-column justify-content-between">
                            <p className="bold mb-3">Your contribution</p>
                            <div className="energyTypeContainer">
                                <img src={'/contribution.png'} alt=""/>
                                <div className="description">
                                    <p>Level of contribution</p>
                                    <h4 className="lowTitle">100 €</h4>
                                </div>
                            </div>
                        </div>
                        <div className="yourEstimatedResults flex-column justify-content-between">
                        <p className="bold mb-3">Estimated Results in 20 years</p>
                        <div className="flex">
                        <div className="energyTypeContainer">
                            <img src={'/WalletCarre.png'} alt=""/>
                            <div className="description">
                                <p>Earning</p>
                                <h4 className="lowTitle">100 €</h4>
                            </div>
                        </div>
                        <div className="energyTypeContainer">
                            <img src={'/avoidedCarbon.png'} alt=""/>
                            <div className="description">
                                <p>Reduced Carbon</p>
                                <h4 className="lowTitle">100 €</h4>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                    </div>

                    <div className="stepContainer2 mb-5 mt-5">
                        <h3 className="checkoutInnerTitle mb-3">Choose criteria</h3>
                        <div className="flex justify-content-between">
                            <div className="flex">
                                <div className="energyTypeContainer">
                                    <img src={'/locationcarre.png'} alt=""/>
                                    <div className="description">
                                        <p>Location for impact</p>
                                        <h4 className="lowTitle">Spain</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="energyType">
                                <p>Energy Type</p>
                                <div className="flex">
                                    <div className="energyMiniContainer flex">
                                        <img src={'/iconSun.png'} alt=""/>
                                        <p className="bold ml-1 mr-4">Solar</p>
                                    </div>
                                    <div className="energyMiniContainer flex">
                                        <img src={'/iconWind.png'} alt=""/>
                                        <p className="bold ml-1 mr-4">Wind</p>
                                    </div>
                                    <div className="energyMiniContainer flex">
                                        <img src={'/iconHydro.png'} alt=""/>
                                        <p className="bold ml-1 mr-4">Hydro</p>
                                    </div>
                                    <div className="energyMiniContainer flex">
                                        <img src={'/iconBiomass.png'} alt=""/>
                                        <p className="bold ml-1 mr-4">Biomass</p>
                                    </div>
                                    <div className="energyMiniContainer flex">
                                        <img src={'/iconGeothermal.png'} alt=""/>
                                        <p className="bold ml-1 mr-4">Geothermal</p>
                                    </div>
                                </div>
                            </div>
                    </div>

                        <div className="stepContainer2 mb-5 mt-5">
                            <h3 className="checkoutInnerTitle mb-3">Graphics of distribution in time</h3>
                        </div>

                        {name ?
                            <div className="stepContainer2 mb-5 mt-5">
                            <h3 className="purpleTitle mb-3">Done !</h3>
                            <div className="flex mb-4">
                                <img src={'/HeartCarre.png'} alt=""/>
                                <h4 className="mt-3 ml-3">Thanks for your contribution !</h4>
                            </div>
                            <PurpleButton title="Go to your wallet" onClick={() => goToWallet()} href="/wallet"/>
                        </div> :
                            <div className="stepContainer2 mb-5 mt-5">
                            <h3 className="purpleTitle mb-3">Payment</h3>

                            <Elements stripe={stripePromise} options={{
                                fonts:[
                                    {
                                        src: '../fonts/Poppins-Regular.ttf',
                                        family: 'Poppins-Regular',
                                        style: 'normal',
                                    }
                                ],
                            }}
                            >
                                <CheckoutForm price={45} isPaymentDone={isPaymentDone}  />
                            </Elements>
                        </div>}




                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Checkout;