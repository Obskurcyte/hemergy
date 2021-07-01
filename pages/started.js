import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useRouter} from "next/router";
import Link from 'next/link';
const Started = () => {

    return (
        <div>
            <Header />
            <div>
                <h1 className='headTitleLog projectTitle'>Let's get started</h1>
                <div className="startedContainer flex justify-content-between">
                    <div className="contributors flex-column">
                        <img src={'/contibutors.png'} alt="" className="contribution"/>
                        <h2>Contributors</h2>
                        <p className="holdProject">Interested in contributing to projects in renewable energy ?</p>
                        <Link href={'/postProject'}>
                            <div className="flex startContainer">
                                <p >Start</p>
                                <img src={'/arrowRightPurple.png'} alt=""/>
                            </div>
                        </Link>
                    </div>

                    <div className="projectHolders flex-column">
                        <img src={'/contributionLogin.png'} alt="" className="contribution"/>
                        <h2>Project holders</h2>
                        <p className="holdProject">Hold a project in Renewable Energy and need funds ?</p>
                        <Link href={'/projects'}>
                            <div className="flex startContainer greenStartContainer">
                                <p>Start</p>
                                <img src={'/arrowRightGreen.png'} alt=""/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Started;