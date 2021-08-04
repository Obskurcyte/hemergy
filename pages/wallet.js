import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Map from "../components/Map";
import axios from "axios";
import PurpleButton from "../components/PurpleButton";
import {useRouter} from "next/router";

const Wallet = ({data}) => {

    const [dataUser, setDataUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const router = useRouter()
    useEffect(() => {
        if ( process.browser) {
            let userData = localStorage.getItem('userDataHemergy');
            const trueData = JSON.parse(userData);
            setDataUser(trueData)
        }
    }, []);

    console.log(dataUser)

    useEffect(() => {
        const getUser = async () => {
            if (dataUser) {
                const {data} = await axios.post('/api/profile/getUser', {
                    email: dataUser.email
                })
                setCurrentUser(data.existingUser)
            }
        }
        getUser().then(() => console.log('wola'))
    }, [currentUser, dataUser])

    console.log(currentUser)

    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="mt-4 mb-4">Wallet</h1>
            {currentUser?.contribution ?

                <div className="recapAndMapContainer flex justify-content-between">
                    <div className="recapContainer flex-column">
                        <div className="flex justify-content-between mb-2">
                            <h4>Balance</h4>
                            <div className='flex'>
                                <img src={'/creditCard.png'} alt="" className="imgCarte"/>
                                <h4 className="ml-1">{currentUser.contribution} €</h4>
                            </div>
                        </div>
                        <div className="flex justify-content-between mb-2">
                            <p className="grey">Total energy assets value</p>
                            <h5>{currentUser.contribution} €</h5>
                        </div>
                        <div className="flex justify-content-between mb-2">
                            <p className="grey">Total energy sold value</p>
                            <h5>0 €</h5>
                        </div>
                        <div className="flex justify-content-between mb-2">
                            <p className="grey">Available to withdraw</p>
                            <h5>0 €</h5>
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
                        <PurpleButton title="See available projects" onClick={async () => await router.push('/projects')} style={{width: '100%'}}/>
                    </div>
                    <div className="mapContainer">
                        <Map />
                    </div>
                </div>
                : <div>
                    <h5>You have not made a contribution yet !</h5>
                    <PurpleButton title="See available projects" href={'/projects'}/>
                </div>}

            </div>
        </div>
    );
};


/*export async function getStaticProps() {


    const {data} = await axios.post('/api/profile/getUser', {
        email: trueData?.email
    })


    return {
        props: {
            data: data,
        },
    };
}

 */
export default Wallet;