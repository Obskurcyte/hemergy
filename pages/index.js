import React from 'react';
import Head from "next/head";
import styles from '../styles/Home.module.css'
import PurpleButton from "../components/PurpleButton";
import WhiteButton from "../components/WhiteButton";
import Header from "../components/Header";
import ReactPlayer from 'react-player'
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hemergy - Index</title>
      </Head>

      <Header />
      <div className="headTitle">
        <h1 className='mainTitle'>All Connected</h1>
        <h3>Individuals, Renewable Energy Communities, Businesses... and Nature, we accelerate energy transition while generating benefits, for all.</h3>
        <div className="buttonContainer">
          <PurpleButton title="Learn More"/>
          <WhiteButton title="See available projects"/>
        </div>
      </div>

        <img src={'/imageAccueil.svg'} alt="" className="imgAccueil"/>

        <div className="howItWorks">
            <h5>HOW IT WORKS</h5>
            <h4>We empower you with genuine and profitable solutions</h4>
            <p>Contribute to high transparency and low carbon future.</p>
        </div>

        <div className="video-container">
            <ReactPlayer
                url="https://play.maxandlea.com/wp-content/uploads/2020/09/Video2-MAXLEA-FR-SHORT-SHORT-V4-600.mp4"
                className="video-presentation"
                playing
                height="100%"
                width="100%"
                loop
                playIcon={<img src={'/PhotoVideo2.png'} alt=""/>}
                light="/overlayVideo.webp"
            />
        </div>

        <div className="contributorsContainer">
            <div className="contributorInner">
                <div>
                    <div className="contributorMini">
                        <h5>BRING AN IMPACT</h5>
                        <h4>Contributors</h4>
                        <p>The simplest way to earn money while doing good in local and far communities. You can buy from everywhere parts of a guaranteed and insured renewable energy generators like solar panels or wind turbines.
                            <br/>Your contribution is secured and allocated to projects of your choice. You see concretely where your positive impact is created and your earnings in real time</p>
                    </div>
                    <PurpleButton title="Start your journey"/>
                </div>
                <img src={"/photoEolienne.png"} alt=""/>

            </div>

            <div className="contributorInner2">
                <img src={"/panneauSolaire.png"} alt="" className='imgEolienne'/>
                <div className="innerEolienneContainer">
                    <div className="contributorMini2">
                        <h5>CLEAN ENERGY</h5>
                        <h4>Project holders</h4>
                        <p>Your energy customized. Get access to cheaper energy, clean and local. We take care of the generator installation and you benefit from an attractive plan.
                            <br/>Clean energy is also the story of communities and engagement. We cooperate with accredited professionals and experts. Make a simulation to see how it works.</p>
                    </div>
                    <PurpleButton title="Start your journey"/>
                </div>
            </div>
        </div>

        <div className="ecosystemContainer">
            <h5>ECOSYSTEM</h5>
            <h4>Developers And Partners</h4>
            <div className="ecosystemInner">
                <div className="ecosystemMini">
                    <h3>Deliver a delightful user experience</h3>
                    <p>The simplest way to earn money while doing good in local and far communities. You can buy from everywhere parts of a guaranteed and insured renewable energy generators like solar panels or wind turbines.
                        <br/>Your contribution is secured and allocated to projects of your choice. You see concretely where your positive impact is created and your earnings in real time</p>
                </div>
                <img src={"/powerPlant.png"} alt=""/>
            </div>

            <div className="ecosystemInner2">
                <img src={"/powerBlockchain.png"} alt=""/>
                <div className="ecosystemMini2">
                    <h3>Power of blockchains</h3>
                    <p>The simplest way to earn money while doing good in local and far communities. You can buy from everywhere parts of a guaranteed and insured renewable energy generators like solar panels or wind turbines.
                        <br/>Your contribution is secured and allocated to projects of your choice. You see concretely where your positive impact is created and your earnings in real time</p>
                </div>
            </div>
            <PurpleButton title="Learn about APIs and documentation" id="apiButton"/>
        </div>


        <div className="ecosystemContainer aboutContainer">
            <h5>ABOUT US</h5>
            <h4>We accelerate the energy transition in harmony with nature</h4>
            <div className="ecosystemInner">
                <div className="ecosystemMini">
                    <h3>Access to environmental and renewable energy assets </h3>
                    <p>We open a direct and seamless access to environmental and renewable energy assets that handle a fair structure of costs, both social and economic.
                        <br/>These assets and generated power could be traded simply and instantly, inside the communities first or outside, to create a global engagement towards a low carbon future.
                    </p>
                </div>
                <img src={"/energyAsset.png"} alt=""/>
            </div>

            <div className="ecosystemInner2">
                <img src={"/eolienne.png"} alt=""/>
                <div className="ecosystemMini2">
                    <h3>Customized low carbon blockchain</h3>
                    <p>Based on a customized low carbon blockchain, we provide compliant solutions that put trust, transparency and efficiency at the heart of our solutions.
                    <br/>Our approach brings simplicity and choice during the funding process, locally or at scale, to create novel interactions between individuals and businesses for the benefit of all.</p>
                </div>
            </div>
            <PurpleButton title="Learn more" id="apiButton"/>
        </div>

        <div className="reasonContainer">
            <h5>REASON</h5>
            <h4>Our reason being</h4>
            <div className="flexContainer">
                <div className="whyContainer">
                    <img src={'/why.png'} alt="" className='whatImage'/>
                    <h4>Why ?</h4>
                    <p>We want to open a new era of abundance by reimagining links between energy and financial models. We reimagine the connection to the sunlight, all for the benefit of people, in harmony with the planet.</p>
                </div>
                <div className="whyContainer">
                    <img src={'/how.png'} alt="" className='whyImage'/>
                    <h4>How ?</h4>
                    <p>We create a decentralized ecosystem where each individual or organization can contribute     to the energy transition while generating economic and social wealthiness at a low cost.</p>
                </div>
                <div className="whyContainer">
                    <img src={'/what.png'} alt="" className='whyImage'/>
                    <h4>What ?</h4>
                    <p>We tokenize renewable energy assets and that change drastically related rights on ownership and how they can be connected to our world of today.</p>
                </div>
            </div>
        </div>

        <div className="contactContainer">
            <h4>Contact Us</h4>
            <p>The platform will handle hundreds of customizable use cases. Which one will be yours? Just ask and we will help!</p>
            <div className="inputFlex">
                <div className="nameInput contactInput">
                    <img src={'/profile.png'} alt="" />
                    <input type="text" placeholder="Enter your full name"/>
                </div>
                <div className="emailInput contactInput">
                    <img src={'/Message.png'} alt="" />
                    <input type="email" placeholder="Enter your email"/>
                </div>
            </div>
            <div className="bigInput">
                <div className="placeholderContainer">
                    <img src={'/Edit.png'} alt=""/>
                    <textarea placeholder="Tell us more about you and your needs"/>
                </div>
            </div>
            <PurpleButton title="Send Message" id="sendMessage"/>
        </div>

        <Footer />

    </div>
  )
}
