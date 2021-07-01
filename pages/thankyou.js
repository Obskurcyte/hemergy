import React from 'react';
import Header from "../components/Header";
import PurpleButton from "../components/PurpleButton";
import Footer from "../components/Footer";

const Thankyou = () => {

    return (
        <div>
            <Header />
            <h1 className='headTitleLog'>Thank you ! </h1>
            <h5 className='comebacksoon'>We will come back to you soon </h5>
            <PurpleButton title="See available projects" id="availableProjects" href={'/projects'}/>
            <div className="imgContainerThankYou">
            <img src={'/thankyou.png'} alt=""/>
            </div>
            <Footer />
        </div>
    );
};

export default Thankyou;