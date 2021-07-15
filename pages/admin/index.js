import React from 'react';
import Header from "../components/Header";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import ProjectCard from "../components/ProjectCard";
import Map from "../components/Map";
import Footer from "../components/Footer";

const Admin = () => {
    return (
        <div>
            <Header />
            <div className="projectsFullContainer">
                <div className="projectsListContainer">

                    <div className="projectsFound">
                        <h3 className="foundProjects">Found 10 projects</h3>
                        <div className="sortBy">
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

export default Admin;