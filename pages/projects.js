import React from 'react';
import Header from "../components/Header";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';
import ProjectCard from "../components/projectCard";
import Footer from "../components/Footer";
import Map from "../components/Map";

const Projects = () => {

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
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };
    const classes = useStyles();

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
                                <div className="energyListItem">
                                    <img src={'/lightningViolet.png'} alt=""/>
                                    <p>Other</p>
                                </div>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                vitae egestas augue. Duis vel est augue.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                        </div>

                <div className='productionChose'>
                    <div className={classes.root}>
                        <div className="productionChoseContainer">
                        <Typography id="input-slider" gutterBottom>
                            Production
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
                                    max={100000}
                                />
                            </Grid>
                        </Grid>

                            </div>
                        </div>
                    </div>

                    <div className="projectsFound">
                        <h3 className="foundProjects">Found 10 projects</h3>
                        <div className="sortBy">
                            <p className="sortByText">Sort by </p>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4bh-content"
                                    id="panel4bh-header"
                                >
                                    <Typography className={classes.heading}>
                                        <div className="energyListItem">
                                            <img src={'/lightningViolet.png'} alt=""/>
                                            <p>New</p>
                                        </div>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                        vitae egestas augue. Duis vel est augue.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>

                    <div className="projectsList">
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                    </div>

                </div>

                <div className="carteContainer">
                    <Map/>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Projects;