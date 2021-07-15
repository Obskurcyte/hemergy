import React from 'react';
import PurpleButton from "./PurpleButton";

const ValidateProjectCard = (props) => {

    return (
        <div className="projectCardContainer">
            <img src={'/panneau.png'} alt=""/>
            <div className="projectCard">
                <div className="projectTitleContainer">
                    <h4 className="projectCardTitle">{props.title}</h4>
                    <PurpleButton title="View details" id="contribute" href={`/admin/${props.link}`}/>
                </div>
                <div className="locationContainer">
                    <img src={'/Location.png'} alt=""/>
                    <p>32 avenue Charles Binder, L'isle-Adam, France</p>
                </div>

                <div className="consommationAndEnergyContainer">
                    <div className="consommationContainer">
                        <img src={'/Exclude.png'} alt=""/>
                        <p>{props.consumption}</p>
                    </div>
                    <div className="energyContainer">
                        <img src={'/yellowSun.png'} alt=""/>
                        <p>Solar</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValidateProjectCard;