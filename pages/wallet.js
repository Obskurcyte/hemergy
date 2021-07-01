import React from 'react';
import Header from "../components/Header";
import Map from "../components/Map";

const Wallet = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="mt-4 mb-4">Wallet</h1>
                <div className="recapAndMapContainer flex justify-content-between">
                    <div className="recapContainer flex-column">
                        <div className="flex justify-content-between mb-2">
                            <h4>Balance</h4>
                            <div className='flex'>
                                <img src={'/creditCard.png'} alt="" className="imgCarte"/>
                                <h4 className="ml-1">150 €</h4>
                            </div>
                        </div>
                        <div className="flex justify-content-between mb-2">
                            <p>Total energy assets value</p>
                            <h5>100 €</h5>
                        </div>
                        <div className="flex justify-content-between mb-2">
                            <p>Total energy sold value</p>
                            <h5>50 €</h5>
                        </div>
                        <div className="flex justify-content-between mb-2">
                            <p>Available to withdraw</p>
                            <h5>50 €</h5>
                        </div>
                        <h4 className='mt-4 mb-4'>You cumulate :</h4>
                        <div className="flex justify-content-between mb-4">
                            <div className="energyTypeContainer">
                                <img src={'/capaciteCarre.png'} alt=""/>
                                <div className="description">
                                    <p>Capacity</p>
                                    <h4 className="lowTitle">300MW/year</h4>
                                </div>
                            </div>
                            <div className="energyTypeContainer">
                                <img src={'/avoidedCarbon.png'} alt=""/>
                                <div className="description">
                                    <p>Reduced carbon</p>
                                    <h4 className="lowTitle">2,5 kg</h4>
                                </div>
                            </div>
                        </div>

                    <div className="flex mt-4">
                        <img src={'/HeartCarre.png'} alt="" className="imgCarte"/>
                        <h4 className="mt-3 ml-3">Thanks for you contribution</h4>
                    </div>
            </div>

                    <div className="mapContainer">
                        <Map />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;