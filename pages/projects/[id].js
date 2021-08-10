import React, {useState} from 'react';
import Header from "../../components/Header";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import PurpleButton from "../../components/PurpleButton";
import Map from "../../components/Map";
import Footer from "../../components/Footer";
import {connectToDatabase} from "../../lib/db";
import {useRouter} from "next/router";
import LineChart from "../../components/Chart";
import RedChart from "../../components/RedChart";
import MapUniqueProject from "../../components/MapUniqueProject";


const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#7F6CFC',
    },
}))(LinearProgress);

const ProjectDetail = ({project}) => {

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

    let imgSource;


    const [value, setValue] = React.useState(30);

    const euroValue = `${value} €`

    console.log(euroValue)
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };


    const classes = useStyles();

    const router = useRouter()
    console.log('project', project)

    const energy = project.energy

    if (energy === 'Solar') {
        imgSource = '/soleilCarre.png'
    }

    if (energy === 'Biomass') {
        imgSource = '/iconBiomass.png'
    }

    if (energy === 'Hydro') {
        imgSource = '/iconHydro.png'
    }

    if (energy === 'Wind') {
        imgSource = '/iconWind.png'
    }

    if (energy === 'Geothermal') {
        imgSource = '/iconGeothermal.png'
    }

    const [isContribution, setIsContribution] = useState(true)

    const avoidedCarbon = project.consumption * 1000 * 790 * 10**(-6)
    const totalEarnings = value*(1.07)**19;

    const goToCheckout = async () => {
        await router.push({
            pathname: '/checkout',
            query: {consumption: project.consumption, contribution: value, energy: energy, city: project.city, id: project._id}
        })
    }

    return (
        <div>
            <Header />
            <div className="productDetailContainer">
                <div className="projectDetailTitleContainer">
                    <div className="goBackContainer">
                        <img src={'/goBack.png'} alt=""/>
                        <p className="backText" onClick={() => router.push('/projects')}>Back</p>
                    </div>
                    <h1 className="projectDetailTitle">{project.title}</h1>
                </div>

                <div className="ProjectDetailsAndMap">
                    <div className="projectDetailsInner">
                        <img src={'/grosPanneau.png'} alt="" className="projectImg"/>
                        <h4 className="projectDetailsTitle">Project details</h4>
                        <div className="line">
                            <div className="energyTypeContainer">
                                <img src={imgSource} alt="" className='imgDetails'/>
                                <div className="description">
                                    <p>Energy Type</p>
                                    <h4 className="lowTitle">{energy}</h4>
                                </div>
                            </div>
                            <div className="energyTypeContainer">
                                <img src={'/capaciteCarre.png'} alt="" className='imgDetails'/>
                                <div className="description">
                                    <p>Capacity</p>
                                    <h4 className="lowTitle">{project.consumption} MW/year</h4>
                                </div>
                            </div>
                        </div>

                        <div className="line">
                            <div className="energyTypeContainer">
                                <img src={'/avoidedCarbon.png'} alt="" className='imgDetails'/>
                                <div className="description">
                                    <p>Avoided carbon</p>
                                    <h4 className="lowTitle">{avoidedCarbon.toFixed(2)} T eq.CO2/year</h4>
                                </div>
                            </div>
                            <div className="energyTypeContainer">
                                <img src={'/walletCarre.png'} alt="" className='imgDetails'/>
                                <div className="description">
                                    <p>Amount to raise</p>
                                    <h4 className="lowTitle">{project.amount} €</h4>
                                </div>
                            </div>
                        </div>

                        <h4 className="projectDetailsTitle">Amount raised</h4>
                        <div className="contributionContainer">
                            <div className="contributors2 mb-3">
                                <div className="numberContributors">
                                    <img src={'/twoUsers.png'} alt=""/>
                                    <p className="amount ml-3">{project.contributors} contributions</p>
                                </div>
                                <div className="amountRaised">
                                    <p className='amount'>{project.contribution} / {project.amount} €</p>
                                </div>
                            </div>
                            <BorderLinearProgress variant="determinate" value={project.contribution} />
                        </div>
                    </div>

                    <div className="productMap">
                        <MapUniqueProject project={project} />
                    </div>
                </div>

                <div className="contributionAndGraph">
                    <div className="contributionContainer2">
                        <h2>Your contribution</h2>
                        <div className={classes.root}>
                            <div className="contributionChoseContainer">
                                <Typography id="input-slider" gutterBottom className="setAmount">
                                    Set amount
                                </Typography>
                                <div className="inputAmount2">
                                    <img src={'/Wallet.png'} alt=""/>
                                    <input
                                        className='productionValue'
                                        value={value}
                                        onChange={(e) => {
                                            console.log(typeof e.target.value)
                                            setValue(e.target.value)
                                        }}
                                        />
                                </div>

                            </div>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Slider
                                        value={value}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        min={0}
                                        style={{color: '#7F6CFC'}}
                                        max={100000}
                                    />
                                </Grid>
                            </Grid>
                        </div>

                        <div className="estimatedResults">
                            <h4 className="mb-3">Estimated result in 20 years</h4>
                            <div className="estimatedInnerContainer">
                                <div className="energyTypeContainer">
                                    <img src={'/walletCarre.png'} alt=""/>
                                    <div className="description">
                                        <p>Earning</p>
                                        <h4 className="lowTitle">{totalEarnings.toFixed(2)} €</h4>
                                    </div>
                                </div>
                                <div className="energyTypeContainer">
                                    <img src={'/avoidedCarbon.png'} alt=""/>
                                    <div className="description">
                                        <p>Reduced carbon</p>
                                        <h4 className="lowTitle">{avoidedCarbon.toFixed(2)} T eq.CO2/year</h4>
                                    </div>
                                </div>
                            </div>

                            <PurpleButton title="Contribute" id="contributeButton" href="javascript:void(0)" onClick={() => goToCheckout()}/>
                        </div>
                    </div>

                    <div className="graphContainer">
                        <div className="graphChoice flex">
                            <div className={isContribution ? "returnContrib": "notreturnContrib"} onClick={() => setIsContribution(!isContribution)}>
                                <p className={isContribution ? "returnContribText": "notreturnContribText"}>Return on contribution</p>
                            </div>
                            <div className={isContribution ? "notreturnContrib": "returnContrib"} onClick={() => setIsContribution(!isContribution)}>
                                <p className={isContribution ? "notreturnContribText": "returnContribText"}>Reduced carbon</p>
                            </div>
                        </div>

                        <div className="graph">
                            {isContribution ? <LineChart height={245} width={600} value={value}/> : <RedChart height={245} width={600} value={project.consumption}/>}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export async function getStaticProps (context) {

    const {params} = context
    const client = await connectToDatabase();
    const db = client.db();

    const projectsToBeValidated = await db
        .collection("validatedProjects")
        .find()
        .toArray()

    const projects = JSON.parse(JSON.stringify(projectsToBeValidated))

    const project = projects.find(project => {
        return (
            project._id === params.id)
    })


    return {
        props: {
            project: project,
        },
    };
}

export async function getStaticPaths() {
    const client = await connectToDatabase();
    const db = client.db();
    const project = await db
        .collection("validatedProjects")
        .find()
        .toArray()

    const ids = project.map(project => project._id)

    const paths = ids.map(id => ({params: {id: id.toString()}}))
    return {
       paths,
        fallback: false
    }
}



export default ProjectDetail;