import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {useRouter} from "next/router";
import Link from 'next/link';
import axios from "axios";
import {AuthContext} from "../../context/auth";

const Index = () => {

    const auth = useContext(AuthContext)
    const router = useRouter();
    const [pendingUser, setPendingUser] = useState(null);

    useEffect(() => {
        const confirmationCode = localStorage.getItem('confirmationCode')
        console.log(confirmationCode)

        const getPendingUser = async () => {
            const pendingUser = await axios.post('api/auth/pending-user', {
                confirmationCode: confirmationCode
            })
            setPendingUser(pendingUser.data.existingUser)
        }
        getPendingUser()
        console.log(pendingUser)
        },  [])


    const signupUser = async () => {
        try {
            const response = await axios.post('api/auth/signup', {
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'User-Agent': '*',
                },
                name: pendingUser.name,
                email: pendingUser.email,
                password: pendingUser.password
            });
            console.log('reponse', response)
            auth.login(response.data.name, response.data.token, response.data.email)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Header />
            {pendingUser ?    <div>
                <h1 className='headTitleLog projectTitle'>Let's get started !</h1>
                <div className="startedContainer flex justify-content-between">
                    <div className="contributors flex-column">
                        <img src={'/contibutors.png'} alt="" className="contribution"/>
                        <h2>Contributors</h2>
                        <p className="holdProject">Interested in contributing to projects in renewable energy ?</p>
                            <div className="flex startContainer" onClick={() => signupUser().then(() => router.push('/postProject'))} >
                                <p >Start</p>
                                <img src={'/arrowRightPurple.png'} alt=""/>
                            </div>
                    </div>

                    <div className="projectHolders flex-column">
                        <img src={'/contributionLogin.png'} alt="" className="contribution"/>
                        <h2>Project holders</h2>
                        <p className="holdProject">Hold a project in Renewable Energy and need funds ?</p>
                            <div className="flex startContainer greenStartContainer" onClick={() => signupUser().then(() => router.push('/projects'))}>
                                <p>Start</p>
                                <img src={'/arrowRightGreen.png'} alt=""/>
                            </div>
                    </div>
                </div>
            </div>: ''}

            <Footer />
        </div>
    );
};

export default Index;