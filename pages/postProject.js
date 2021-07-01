import React, {useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import PurpleButton from "../components/PurpleButton";

const PostProject = () => {

    const [other, setOther] = useState(false);
    const [solar, setSolar] = useState(false);
    const [wind, setWind] = useState(false);
    const [hydro, setHydro] = useState(false);
    const [biomass, setBiomass] = useState(false);
    const [geothermal, setGeothermal] = useState(false);
    const [hydrogen, setHydrogen] = useState(false);

    const [suivant1, setSuivant1] = useState(false);
    const [suivant2, setSuivant2] = useState(false);
    const [suivant, setSuivant] = useState(true);

    return (
        <div>
            <Header/>
            <h1 className='headTitleLog projectTitle'>Tell us more about your project</h1>
            <div className="postProjectContainer">
                <div className="amountNeededContainer">
                    <div className="amountNeeded">
                        <h5 className='amountNeededText'>Amount needed</h5>
                        <div className="inputAmount">
                            <img src={'/Wallet.png'} alt=""/>
                            <input type="text" className='inputContribute' placeholder="100€"/>
                        </div>
                    </div>

                    <div className="energyNeeded">
                        <h5 className='amountNeededText energyText'>Choose energy type</h5>
                        <div className='energyContainer'>
                            <div className={other ? 'energyViolet' : "energy"} onClick={() => setOther(!other)}>
                                <img src={'/lightning.png'} alt="" className='imageEnergy'/>
                                <p className='energyText'>Other</p>
                            </div>
                            <div className={solar ? 'energyViolet' : "energy"} onClick={() => setSolar(!solar)}>
                                <img src={'/solar.png'} alt="" className='imageEnergy'/>
                                <p className='energyText'>Solar</p>
                            </div>
                            <div className={wind ? 'energyViolet' : "energy"} onClick={() => setWind(!wind)}>
                                <img src={'/wind.png'} alt="" className='imageEnergy'/>
                                <p className='energyText'>Wind</p>
                            </div>
                            <div className={hydro ? 'energyViolet' : "energy"} onClick={() => setHydro(!hydro)}>
                                <img src={'/hydro.png'} alt="" className='imageEnergy'/>
                                <p className='energyText'>Hydro</p>
                            </div>
                        </div>

                        <div className='energyContainer'>
                            <div className={biomass ? 'energyViolet' : "energy"} onClick={() => setBiomass(!biomass)}>
                                <img src={'/hydro.png'} alt="" className='imageEnergy'/>
                                <p className='energyText'>Biomass</p>
                            </div>
                            <div className={geothermal ? 'energyViolet' : "energy"} onClick={() => setGeothermal(!geothermal)}>
                                <img src={'/solar.png'} alt="" className='imageEnergy'/>
                                <p className='energyText'>Geothermal</p>
                            </div>
                            <div className={hydrogen ? 'energyViolet' : "energy"} onClick={() => setHydrogen(!hydrogen)}>
                                <img src={'/hydrogen.png'} alt="" className='imageEnergy'/>
                                <p className='energyText'>Hydrogen</p>
                            </div>
                        </div>
                    </div>


                </div>

                {suivant && (
                    <div className="projectDetails">
                        <div className="placeholderContainer2 flex-column">
                            <img src={'/Edit.png'} alt=""/>
                            <input placeholder="Title of your project"/>
                        </div>
                        <PurpleButton title="Suivant" id="suivantButton" href="javascript:void(0)" onClick={() => {
                            setSuivant1(true)
                            setSuivant(false)
                        }}/>
                    </div>
                )}



                {suivant1 && (
                    <div className="projectDetails">
                        <div className="placeholderContainer2 flex-column">
                            <img src={'/Edit.png'} alt=""/>
                            <input placeholder="Estimated production of your project (MW/year)"/>
                        </div>
                        <div className="flex suivantContainerPost justify-content-between">
                            <PurpleButton title="Précedent"  href="javascript:void(0)" onClick={() => {
                                setSuivant(true)
                                setSuivant1(false)
                            }}/>
                        <PurpleButton title="Suivant"  href="javascript:void(0)" onClick={() => {
                            setSuivant2(true)
                            setSuivant1(false)
                        }}/>
                        </div>
                    </div>
                )}

                {suivant2 && (
                    <div className="projectDetails3">
                        <div className="bigInput">
                            <div className="placeholderContainer">
                                <img src={'/Edit.png'} alt=""/>
                                <textarea placeholder="Other details you want to share"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <PurpleButton title="Send" id="sendProject" href={'/thankyou'}/>
            <Footer />
        </div>
    );
};

export default PostProject;