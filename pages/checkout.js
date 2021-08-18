import React, {useState, useEffect} from 'react';
import Header from "../components/Header";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import Footer from "../components/Footer";
import PurpleButton from "../components/PurpleButton";
import {useRouter} from "next/router";
import LineChart from "../components/Chart";
import RedChart from "../components/RedChart";
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
   /* useEffect(() => {
        if (process.browser) {
            let cartData = localStorage.getItem('cardName');
            setName(cartData)
            console.log(cartData)
        }
    })

    */

    const router = useRouter();
    console.log(router.query)

    const consumption = router.query.consumption
    const contribution = router.query.contribution
    const energy = router.query.energy
    const city = router.query.city
    const _id = router.query.id
    const avoidedCarbon = consumption * 1000 * 790 * 10**(-6)
    const totalEarnings = contribution*(1.07)**19;

    console.log('contrin', contribution)
    console.log(city, _id)

    const goToWallet = () => {
        localStorage.removeItem('cardName')
    }

    let imgSource
    if (energy === 'Solar') {
        imgSource = '/iconSun.png'
    }

    if (energy === 'Biomass') {
        imgSource = '/iconBiomass.png'
    }

    if (energy === 'Hydro') {
        imgSource = '/iconHydro.png'
    }

    if (energy === 'Wind') {
        imgSource = '/iconWind.png'
    }

    if (energy === 'Geothermal') {
        imgSource = '/iconGeothermal.png'
    }


     return (
        <div>
            <Header />
            <h1 className='headTitleLog'>Contribution</h1>
            <div className="checkoutContainer">
                <div className="stepContainer mb-5">
                    <h3 className="checkoutInnerTitle mb-3">Your contribution</h3>
                    <div className="flex your-contribution-container">
                        <div className="yourContribution flex-column justify-content-between">
                            <p className="bold mb-3">Your contribution</p>
                            <div className="energyTypeContainer contribution-container">
                                <img src={'/contribution.png'} alt=""/>
                                <div className="description">
                                    <p>Level of contribution</p>
                                    <h4 className="lowTitle">{contribution} €</h4>
                                </div>
                            </div>
                        </div>
                            <div className="flex locationCheckoutContainer">
                                <div className="energyTypeContainer contribution-container checkoutContainer1">
                                    <img src={'/locationcarre.png'} alt="" className="locationcarre"/>
                                    <div className="description">
                                        <p>Location for impact</p>
                                        <h4 className="lowTitle">{city}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="energyType checkoutContainer2">
                                <p>Energy Type</p>
                                <div className="flex">
                                    <div className="energyMiniContainer flex">
                                        <img src={imgSource} alt=""/>
                                        <p className="bold ml-1 mr-4">{energy}</p>
                                    </div>
                                </div>
                            </div>


                </div>
                    </div>

                    <div className="stepContainer2 mb-5 mt-5">
                        <h3 className="checkoutInnerTitle mb-3">Results</h3>
                        <div className="flex justify-content-between">

                            <div className="yourEstimatedResults flex-column justify-content-between">
                                <p className="bold mb-3">Estimated Results in 20 years</p>
                                <div className="flex">
                                    <div className="energyTypeContainer contribution-container">
                                        <img src={'/WalletCarre.png'} alt=""/>
                                        <div className="description">
                                            <p>Earning</p>
                                            <h4 className="lowTitle">{totalEarnings.toFixed(2)} €</h4>
                                        </div>
                                    </div>
                                    <div className="energyTypeContainer contribution-container">
                                        <img src={'/avoidedCarbon.png'} alt=""/>
                                        <div className="description">
                                            <p>Reduced Carbon</p>
                                            <h4 className="lowTitle">{avoidedCarbon.toFixed(2)} T eq.CO2/year</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                        <div className="stepContainer2 mb-5 mt-5">
                            <h3 className="checkoutInnerTitle mb-3">Graphics of distribution in time</h3>
                            <div className="flex justify-content-between checkout-graph">
                                <LineChart value={contribution}/>
                                <RedChart value={consumption}/>
                            </div>
                        </div>

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
                                <CheckoutForm price={45} isPaymentDone={isPaymentDone}  contribution={contribution} id={_id}/>
                            </Elements>
                        </div>




                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Checkout;