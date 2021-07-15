import React, {useContext, useState} from 'react';
import Header from "../components/Header";
import PurpleButton from "../components/PurpleButton";
import Link from "next/link";
import Footer from "../components/Footer";
import {Formik} from "formik";
import {useRouter} from "next/router";
import axios from "axios";
import {AuthContext} from "../context/auth";

const Login = () => {

    const auth = useContext(AuthContext)
    const router = useRouter();

    const initialValues = {
        password: '',
        email: ''
    }

    const [error, setErrors] = useState('')

    return (
        <div className='loginContainer'>
            <Header/>
            <h1 className='headTitleLog'>Log in</h1>

            <Formik
                initialValues={initialValues}
                onSubmit={async values => {
                    try {
                        console.log('wola')
                        const response = await axios.post('/api/auth/login', {
                            headers: {
                                Accept: 'application/json, text/plain, */*',
                                'User-Agent': '*',
                            },
                            email: values.email,
                            password: values.password
                        })
                        auth.login(response.data.name, response.data.token)
                        await router.push('/wallet')
                        console.log(response)
                    } catch (err) {
                        console.log(err)
                }

                }}
            >
                {props => (
                    <div>
                        <div className="emailInput">
                            <img src={'/Message.png'} alt="" className='imgConnection'/>
                            <input
                                type="email"
                                placeholder="Email"
                                value={props.values.email}
                                onChange={props.handleChange('email')}
                            />
                        </div>
                        <div className="emailInput">
                            <img src={'/Password.png'} alt="" />
                            <input
                                type="password"
                                placeholder="**********"
                                value={props.values.password}
                                onChange={props.handleChange('password')}
                            />
                        </div>
                        <PurpleButton title='Log In' id='loginButton' href="javascript:void(0)" onClick={props.handleSubmit}/>
                    </div>
                )}
            </Formik>


            <div className="hrContainer">
                <hr/><p style={{marginTop: "1%"}}>Log in with your profile </p><hr/>
            </div>

            <div className="oauthContainer">
                <div className="oauthInnerContainer">
                    <img src={'/google.png'} alt="" className='imgConnection'/>
                    <p className='oauthText'>Log In with Google</p>
                </div>
                <div className="oauthInnerContainer">
                    <img src={'/facebookConnect.png'} alt=""/>
                    <p className='oauthText'>Log In with Facebook</p>
                </div>
            </div>

            <div className="signUpContainer">
                <div>
                    <p>Don't have an account ?</p>
                </div>
                <div className='goToSignupContainer'>
                    <Link href="/signup"><p className='goToSignup'>Sign Up</p></Link>
                </div>
            </div>

            <div className="leaveBlanck">

            </div>

            <Footer />
        </div>
    );
};

export default Login;