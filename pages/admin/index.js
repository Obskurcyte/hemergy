import React from 'react';
import Header from "../../components/Header";
import Map from "../../components/Map";
import Footer from "../../components/Footer";
import {connectToDatabase} from "../../lib/db";
import ValidateProjectCard from "../../components/ValidateProjectCard";

const Index = ({projectsToBeValidated}) => {

    console.log(projectsToBeValidated)

    return (
        <div>
            <Header />
            <div className="projectsFullContainer">
                <div className="projectsAdminListContainer">

                    <div className="projectsFound">
                        <h3 className="foundProjects">Found 10 projects</h3>
                        <div className="sortBy">
                        </div>
                    </div>

                        {projectsToBeValidated.map((project) => (
                            <div className="projectsList">
                                <ValidateProjectCard
                                    title={project.title}
                                    consumption={project.consumption}
                                    link={project._id}
                                />
                            </div>
                            ))}

                </div>

                {/*} <div className="carteContainer">
                    <Map/>
                </div>
                */}
            </div>

            <Footer />
        </div>
    );
};


export async function getServerSideProps() {
    const client = await connectToDatabase();
    const db = client.db();

    const projectsToBeValidated = await db
        .collection("projects")
        .find()
        .toArray()

    console.log(projectsToBeValidated)
    return {
        props: {
            projectsToBeValidated: JSON.parse(JSON.stringify(projectsToBeValidated)),
        },
    };
}
export default Index;