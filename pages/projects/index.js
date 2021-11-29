import React, {useState} from 'react';
import Header from "../../components/Header";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import ProjectCard from "../../components/ProjectCard";
import Footer from "../../components/Footer";
import Map from "../../components/Map";
import {connectToDatabase} from "../../lib/db";


const Index = ({projects}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        thumb: {
            height: '30px'
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }));


    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [value, setValue] = React.useState(30);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        filterProduction(value)
    };

    const classes = useStyles();
    const [energyChosen, setEnergyChose] = useState('Other')
    const [photoEnergyChosen, setPhotoEnergyChosen] = useState('/lightningViolet.png')
    console.log(projects);
    const [filteredProjects, setFilteredProjects] = useState([])
    const filterProject = (energyFiltered) => {
        setFilteredProjects(projects.filter(project => {
            return (project.energy === energyFiltered)
        }))
    }

    const filterProduction = (production) => {
        setFilteredProjects(projects.filter(project => {
            return project.consumption > production
        }))
    }

    console.log(projects)
    console.log('filter', filteredProjects)
    return (
        <div>
            <Header />
            <div className="projectsFullContainer">
                <div className="projectsListContainer">
                    <div className="energyAndProductionChose">
                        <div className="energyChose">
                    <p className="energyTypeText">Energy Type</p>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography className={classes.heading}>
                                <div className="flex">
                                    <img src={photoEnergyChosen} alt=""/>
                                    <p>{energyChosen}</p>
                                </div>

                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="flex-column itemContainer">
                                <div className="energyListItem" onClick={() => {
                                    setEnergyChose('Other')
                                    setFilteredProjects([])
                                    setPhotoEnergyChosen('/lightningViolet.png')
                                    setExpanded(false)
                                }}>
                                    <img src={'/lightningViolet.png'} alt=""/>
                                    <p>Other</p>
                                </div>
                            <div className="energyListItem" onClick={() => {
                                setEnergyChose('Solar')
                                filterProject('Solar')
                                setPhotoEnergyChosen('/yellowSun.png')
                                setExpanded(false)
                            }}>
                                <img src={'/yellowSun.png'} alt=""/>
                                <p>Solar</p>
                            </div>
                            <div className="energyListItem" onClick={() => {
                                setEnergyChose('Biomass')
                                filterProject('Biomass')
                                setPhotoEnergyChosen('/iconBiomass.png')
                                setExpanded(false)
                            }}>
                                <img src={'/iconBiomass.png'} alt=""/>
                                <p>Biomass</p>
                            </div>
                            <div className="energyListItem" onClick={() => {
                                setEnergyChose('Geothermal')
                                filterProject('Geothermal')
                                setPhotoEnergyChosen('/iconGeothermal.png')
                                setExpanded(false)
                            }}>
                                <img src={'/iconGeothermal.png'} alt=""/>
                                <p>Geothermal</p>
                            </div>
                            <div className="energyListItem" onClick={() => {
                                setEnergyChose('Hydro')
                                filterProject('Hydro')
                                setPhotoEnergyChosen('/iconHydro.png')
                                setExpanded(false)
                            }}>
                                <img src={'/iconHydro.png'} alt=""/>
                                <p>Hydro</p>
                            </div>
                            <div className="energyListItem" onClick={() => {
                                setEnergyChose('Wind')
                                filterProject('Wind')
                                setPhotoEnergyChosen('/iconWind.png')
                                setExpanded(false)
                            }}>
                                <img src={'/iconWind.png'} alt=""/>
                                <p>Wind</p>
                            </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                        </div>

                <div className='productionChose'>
                    <div className={classes.root}>
                        <div className="productionChoseContainer">
                        <Typography id="input-slider" gutterBottom>
                            Minimal production
                        </Typography>
                        <p className='productionValue'>{value} MWh/year</p>
                        </div>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <Slider
                                    value={typeof value === 'number' ? value : 0}
                                    onChange={handleSliderChange}
                                    aria-labelledby="input-slider"
                                    min={0}
                                    style={{color: '#7F6CFC'}}
                                    max={1000}
                                />
                            </Grid>
                        </Grid>

                            </div>
                        </div>
                    </div>

                    <div className="projectsFound">
                        <h3 className="foundProjects">Found {filteredProjects.length === 0 ? projects.length : filteredProjects.length} projects</h3>
                        {/*  <div className="sortBy">
                            <p className="sortByText">Sort by </p>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4bh-content"
                                    id="panel4bh-header"
                                >
                                    <Typography className={classes.heading}>
                                        <div className="flex">
                                            <img src={'/lightningViolet.png'} alt=""/>
                                            <p>New</p>
                                        </div>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="flex-column itemContainer">
                                        <div className="energyListItem" onClick={() => {
                                            setEnergyChose('Other')
                                            setPhotoEnergyChosen('/lightningViolet.png')
                                            setExpanded(false)
                                        }}>
                                            <img src={'/lightningViolet.png'} alt=""/>
                                            <p>Other</p>
                                        </div>
                                        <div className="energyListItem" onClick={() => {
                                            setEnergyChose('Solar')
                                            setPhotoEnergyChosen('/yellowSun.png')
                                            setExpanded(false)
                                        }}>
                                            <img src={'/yellowSun.png'} alt=""/>
                                            <p>Solar</p>
                                        </div>
                                        <div className="energyListItem" onClick={() => {
                                            setEnergyChose('Biomass')
                                            setPhotoEnergyChosen('/iconBiomass.png')
                                            setExpanded(false)
                                        }}>
                                            <img src={'/iconBiomass.png'} alt=""/>
                                            <p>Biomass</p>
                                        </div>
                                        <div className="energyListItem" onClick={() => {
                                            setEnergyChose('Geothermal')
                                            setPhotoEnergyChosen('/iconGeothermal.png')
                                            setExpanded(false)
                                        }}>
                                            <img src={'/iconGeothermal.png'} alt=""/>
                                            <p>Geothermal</p>
                                        </div>
                                        <div className="energyListItem" onClick={() => {
                                            setEnergyChose('Hydro')
                                            setPhotoEnergyChosen('/iconHydro.png')
                                            setExpanded(false)
                                        }}>
                                            <img src={'/iconHydro.png'} alt=""/>
                                            <p>Hydro</p>
                                        </div>
                                        <div className="energyListItem" onClick={() => {
                                            setEnergyChose('Wind')
                                            setPhotoEnergyChosen('/iconWind.png')
                                            setExpanded(false)
                                        }}>
                                            <img src={'/iconWind.png'} alt=""/>
                                            <p>Wind</p>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        */}
                    </div>

                    {filteredProjects.length === 0 ? (projects.map(project => (
                            <div className="projectsList">
                                <ProjectCard
                                    link={project._id}
                                    title={project.title}
                                    consumption={project.consumption}
                                    city={project.city}
                                    energy={project.energy}
                                />
                            </div>
                        ))) : (filteredProjects.map(project => (
                        <div className="projectsList">
                            <ProjectCard
                                link={project._id}
                                title={project.title}
                                consumption={project.consumption}
                                city={project.city}
                                energy={project.energy}
                            />
                        </div>
                        )))}
                </div>

                <div className="carteContainer">
                    <Map projects={projects}/>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export async function getServerSideProps() {
    const client = await connectToDatabase();
    const db = client.db();

    const projects = await db
        .collection("validatedProjects")
        .find()
        .toArray()

    return {
        props: {
            projects: JSON.parse(JSON.stringify(projects)),
        },
    };
}

export default Index;
