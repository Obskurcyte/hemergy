import React from 'react';
import PurpleButton from "../components/PurpleButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Checkbox from '@material-ui/core/Checkbox';
import {Formik} from "formik";
import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/router'

const Signup = () => {


    const router = useRouter()

    const [checked, setChecked] = React.useState(true);

    const initialValues = {
        email: '',
        name: '',
        password: ''
    }
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <div className='loginContainer'>
            <Header/>
            <h1 className='headTitleLog'>Sign up</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    try {
                        const response = await axios.post('/api/auth/signup', {
                            name: values.name,
                            email: values.email,
                            password: values.password
                        })
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
                            <img src={'/Profile.png'} alt="" className='imgConnection'/>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={props.values.name}
                                onChange={props.handleChange('name')}
                            />
                        </div>
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
                            <img src={'/Password.png'} alt="" className='imgConnection'/>
                            <input
                                type="password"
                                placeholder="**********"
                                value={props.values.password}
                                onChange={props.handleChange('password')}
                            />
                        </div>

                        <div className="conditions">
                            <Checkbox
                                checked={checked}
                                style ={{
                                    color: "#7F6CFC",
                                }}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <div>
                                <p className='acceptText'>I accept the terms and conditions</p>
                            </div>
                        </div>
                        <PurpleButton title='Sign up' id='loginButton' onClick={props.handleSubmit} href="javascript:void(0)"/>
                    </div>
                )}

            </Formik>

            <div className="hrContainer">
                <hr/><p style={{marginTop: "1%"}}>Sign up with your profile </p><hr/>
            </div>

            <div className="oauthContainer">
                <div className="oauthInnerContainer">
                    <img src={'/google.png'} alt=""/>
                    <p className='oauthText'>Sign up with Google</p>
                </div>
                <div className="oauthInnerContainer">
                    <img src={'/facebookConnect.png'} alt=""/>
                    <p className='oauthText'>Sign up with Facebook</p>
                </div>
            </div>

            <div className="signUpContainer">
                <div>
                <p>Already have an account ?</p>
                </div>
                <div className='goToSignupContainer'>
                    <Link href="/login"><p className='goToSignup'>Log in</p></Link>
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default Signup;