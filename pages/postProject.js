import React, {useState, useEffect} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PurpleButton from "../components/PurpleButton";
import {Formik} from 'formik';
import axios from 'axios';
import {useRouter} from "next/router";
import Map from "../components/Map";
import {useLoadScript} from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxPopover} from "@reach/combobox";
import Head from "next/head";
const libraries = ["places"];

const PostProject = () => {


    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => 48.8534,
                lng: () => 2.3488
            },
            radius: 4000 * 1000
        }
    });

    const router = useRouter()
    const [other, setOther] = useState(false);
    const [solar, setSolar] = useState(false);
    const [wind, setWind] = useState(false);
    const [hydro, setHydro] = useState(false);
    const [biomass, setBiomass] = useState(false);
    const [geothermal, setGeothermal] = useState(false);
    const [hydrogen, setHydrogen] = useState(false);
    const [suivant1, setSuivant1] = useState(false);
    const [suivant2, setSuivant2] = useState(false);
    const [suivant3, setSuivant3] = useState(true);
    const [suivant4, setSuivant4] = useState(false);
    const [suivant, setSuivant] = useState(false);
    const [suivant5, setSuivant5] = useState(false);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [amountNeeded, setAmountNeeded] = useState('')

    const initialValues = {
        amount: ''
    }

    const [energy, setEnergy] = useState('')


    const [error, setError] = useState('');
    console.log(error)
    console.log()
    return (
        <div>
            <Head>
                <title>Project posted</title>
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzlcwYqW89dZyJywDmXV26GqixsLCH98c&libraries=places"/>
            </Head>
            <Header/>
            <h1 className='headTitleLog projectTitle'>Tell us more about your project</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={async values => {
                    try {
                        await axios.post('api/postProject', {
                            energy: energy,
                            amount: amountNeeded,
                            title: values.title,
                            consumption: values.consumption,
                            infos: values.infos,
                            projectId: Math.random()*10000000000,
                            lat: lat,
                            lng: lng,
                            city: value
                        })
                        await router.push('/thankyou')
                    } catch (err) {
                        console.log(err)
                    }
                    console.log(values)
                }}>
                {props => (
                    <div>
                        <div className="postProjectContainer">

                                {suivant3 && (
                                    <div className="titleContainer">
                                        <div className="amountNeeded">
                                        <h5 className='amountNeededText'>Amount needed</h5>
                                        <div className="inputAmount">
                                            <img src={'/Wallet.png'} alt=""/>
                                            <input
                                                type="text"
                                                className='inputContribute'
                                                onChange={(e) => {
                                                    props.handleChange('amount')
                                                    setAmountNeeded(e.target.value)
                                                }}
                                                placeholder="100€"/>
                                        </div>
                                        </div>
                                        <p style={{color: 'red', textAlign: 'center'}}>{error}</p>
                                        <PurpleButton title="Suivant" id="suivantButton1" href="javascript:void(0)" onClick={() => {
                                            if (amountNeeded) {
                                                setSuivant3(false)
                                                setSuivant4(true)
                                                setError(null)
                                            } else {
                                                setError('Please Fill this input field')
                                                setSuivant3(true)
                                            }
                                        }}/>
                                    </div>
                                )}


                                {suivant4 && (
                                    <div className="energyNeeded">
                                        <h5 className='amountNeededText energyText text-center'>Choose energy type</h5>
                                        <div className='energyContainer'>
                                            <div className={other ? 'energyViolet' : "energy"} onClick={() => {
                                                setOther(!other)
                                                setEnergy('Other')
                                            }}>
                                                <img src={'/lightning.png'} alt="" className='imageEnergy'/>
                                                <p className='energyText'>Other</p>
                                            </div>
                                            <div className={solar ? 'energyViolet' : "energy"} onClick={() => {
                                                setSolar(!solar)
                                                setEnergy('Solar')
                                            }}>
                                                <img src={'/solar.png'} alt="" className='imageEnergy'/>
                                                <p className='energyText'>Solar</p>
                                            </div>
                                            <div className={wind ? 'energyViolet' : "energy"} onClick={() => {
                                                setWind(!wind)
                                                setEnergy('Wind')
                                            }}>
                                                <img src={'/wind.png'} alt="" className='imageEnergy'/>
                                                <p className='energyText'>Wind</p>
                                            </div>
                                            <div className={hydro ? 'energyViolet' : "energy"} onClick={() => {
                                                setHydro(!hydro)
                                                setEnergy('Hydro')
                                            }}>
                                                <img src={'/hydro.png'} alt="" className='imageEnergy'/>
                                                <p className='energyText'>Hydro</p>
                                            </div>
                                        </div>

                                        <div className='energyContainer mb-5'>
                                            <div className={biomass ? 'energyViolet' : "energy"} onClick={() => {
                                                setBiomass(!biomass)
                                                setEnergy('Biomass')
                                            }}>
                                                <img src={'/hydro.png'} alt="" className='imageEnergy'/>
                                                <p className='energyText'>Biomass</p>
                                            </div>
                                            <div className={geothermal ? 'energyViolet' : "energy"} onClick={() => {
                                                setGeothermal(!geothermal)
                                                setEnergy('Geothermal')
                                            }}>
                                                <img src={'/solar.png'} alt="" className='imageEnergy'/>
                                                <p className='energyText'>Geothermal</p>
                                            </div>
                                            <div className={hydrogen ? 'energyViolet' : "energy"} onClick={() => {
                                                setHydrogen(!hydrogen)
                                                setEnergy('Hydrogen')
                                            }}>
                                                <img src={'/hydrogen.png'} alt="" className='imageEnergy'/>
                                                <p className='energyText'>Hydrogen</p>
                                            </div>
                                        </div>
                                        <div className="flex suivantContainerPost justify-content-between">
                                            <PurpleButton title="Précedent"  href="javascript:void(0)" onClick={() => {
                                                setSuivant3(true)
                                                setSuivant4(false)
                                            }}/>
                                            <PurpleButton title="Suivant" id="suivantButton" href="javascript:void(0)" onClick={() => {
                                                setSuivant(true)
                                                setSuivant4(false)
                                            }}/>
                                        </div>

                                    </div>
                                )}


                            {suivant && (
                                <div className="projectDetails">
                                    <div className="placeholderContainer2 flex-column">
                                        <img src={'/Edit.png'} alt=""/>
                                        <input
                                            placeholder="Title of your project"
                                            value={props.values.title}
                                            onChange={props.handleChange('title')}
                                        />
                                    </div>
                                    <div className="flex suivantContainerPost justify-content-between">
                                        <PurpleButton title="Précedent"  href="javascript:void(0)" onClick={() => {
                                            setSuivant4(true)
                                            setSuivant(false)
                                        }}/>
                                        <PurpleButton title="Suivant"  href="javascript:void(0)" onClick={() => {
                                            setSuivant1(true)
                                            setSuivant(false)
                                        }}/>
                                    </div>
                                </div>
                            )}



                            {suivant1 && (
                                <div className="projectDetails">
                                    <div className="placeholderContainer2 flex-column">
                                        <img src={'/Edit.png'} alt=""/>
                                        <input
                                            placeholder="Estimated production of your project (MW/year)"
                                            value={props.values.consumption}
                                            onChange={props.handleChange('consumption')}
                                        />
                                    </div>
                                    <div className="flex suivantContainerPost justify-content-between">
                                        <PurpleButton title="Précedent"  href="javascript:void(0)" onClick={() => {
                                            setSuivant(true)
                                            setSuivant1(false)
                                        }}/>
                                        <PurpleButton title="Suivant"  href="javascript:void(0)" onClick={() => {
                                            setSuivant5(true)
                                            setSuivant1(false)
                                        }}/>
                                    </div>
                                </div>
                            )}


                            {suivant5 && (
                         <div className="searchBarContainer">
                             <Combobox onSelect={async (address) => {
                                 setValue(address, false);
                                 clearSuggestions();
                                 try {
                                     const results = await getGeocode({address})
                                     const {lat, lng} = await getLatLng(results[0]);
                                     setLat(lat)
                                     setLng(lng)
                                 } catch(err) {
                                     console.log(err)
                                 }

                             }}
                             >
                                 <ComboboxInput
                                     value={value}
                                     onChange={(e) => {
                                         setValue(e.target.value)
                                     }}
                                     style={{width: '100%'}}
                                     disabled={!ready}
                                     placeholder="Enter the city of your project"
                                 />
                                 <ComboboxPopover
                                     style={{backgroundColor: 'white', paddingLeft: '1%'}}
                                 >
                                     {status === 'OK' && data.map(({id, description}) => {
                                             return (
                                                 <ComboboxOption key={id} value={description}/>
                                             )
                                         }
                                     )}
                                 </ComboboxPopover>
                             </Combobox>

                                    <div className="flex suivantContainerPost justify-content-between">
                                        <PurpleButton title="Précedent"  href="javascript:void(0)" onClick={() => {
                                            setSuivant1(true)
                                            setSuivant5(false)
                                        }}/>
                                        <PurpleButton title="Suivant"  href="javascript:void(0)" onClick={() => {
                                            setSuivant2(true)
                                            setSuivant5(false)
                                        }}/>
                                    </div>
                                </div>
                            )}

                            {suivant2 && (
                                <div className="projectDetails3Container">
                                    <div className="projectDetails3">
                                        <div className="bigInput">
                                            <div className="placeholderContainer">
                                                <img src={'/Edit.png'} alt="" className="imgPlaceholder"/>
                                                <textarea
                                                    placeholder="Other details you want to share"
                                                    value={props.values.infos}
                                                    onChange={props.handleChange('infos')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex suivantContainerPost justify-content-between">
                                        <PurpleButton title="Précedent"  href="javascript:void(0)" onClick={() => {
                                            setSuivant1(true)
                                            setSuivant2(false)
                                        }}/>
                                        <PurpleButton title="Send"  href="javascript:void(0)" onClick={props.handleSubmit}/>
                                    </div>
                                </div>
                            )}

                            <div className="blanck">

                            </div>
                        </div>

                    </div>
                )}


            </Formik>


            <Footer />
        </div>
    );
};


export default PostProject;