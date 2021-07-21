import React from 'react';
import PurpleButton from "./PurpleButton";

const ProjectCard = (props) => {

    let imgSource;
    if (props.energy === 'Solar') {
        imgSource = '/yellowSun.png'
    }

    if (props.energy === 'Biomass') {
        imgSource = '/iconBiomass.png'
    }

    if (props.energy === 'Hydro') {
        imgSource = '/iconHydro.png'
    }

    if (props.energy === 'Wind') {
        imgSource = '/iconWind.png'
    }

    if (props.energy === 'Geothermal') {
        imgSource = '/iconGeothermal.png'
    }

    return (
        <div className="projectCardContainer">
            <img src={'/panneau.png'} alt="" className="panneauImg"/>
            <div className="projectCard">
                <div className="projectTitleContainer">
                    <h4 className="projectCardTitle">{props.title}</h4>
                    <PurpleButton title="Contribute" id="contribute" href={`/projects/[id]`} as={`/projects/${props.link}`}/>
                </div>
                <div className="locationContainer">
                    <img src={'/Location.png'} alt="" className='locationCardImg'/>
                    <p>{props.city}</p>
                </div>

                <div className="consommationAndEnergyContainer">
                    <div className="consommationContainer">
                        <img src={'/Exclude.png'} alt="" className="excludeImg"/>
                        <p>{props.consumption} MW/Year</p>
                    </div>
                    <div className="energyContainerProject">
                        <img src={imgSource} alt=""/>
                        <p>{props.energy}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;


