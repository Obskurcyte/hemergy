import React, {useContext} from 'react';
import PurpleButton from "../components/PurpleButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Checkbox from '@material-ui/core/Checkbox';
import {Formik} from "formik";
import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/router'
import {AuthContext} from "../context/auth";
import {GoogleLogin} from "react-google-login";
import {useDispatch} from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Signup = () => {

    const router = useRouter()

    const [checked, setChecked] = React.useState(true);
    const dispatch = useDispatch()
    const initialValues = {
        email: '',
        name: '',
        password: ''
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: {result, token}})
            await router.push('/started')
        } catch(err) {
            console.log(err)
        }
        console.log(res)
    }

    const googleFailure = () => {
        console.log("Google sign in was unsuccessful... Try again later !")
    }

    const responseFacebook = async (res) => {
        localStorage.setItem('userDataHemergy',
            JSON.stringify({name: res.name, token: res.acessToken, email: res.email})
        )
        await router.push('/started')
    }

    return (
        <div className='loginContainer'>
            <Header/>
            <h1 className='headTitleLog'>Sign up</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    let code = '';
                    for (let i = 0; i < 25; i++) {
                        code += characters[Math.floor(Math.random() * characters.length )];
                    }
                    localStorage.setItem('confirmationCode', code)
                    try {
                        await axios.post('api/send-confirmation-email', {
                            email: values.email,
                            name: values.name,
                            confirmationCode: code,
                            password: values.password
                        }).then(() => router.push('/email-confirmation'))
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

            {/*   <div className="oauthContainer">

                    {/* <img src={'/google.png'} alt=""/>
                    <p className='oauthText'>Sign up with Google</p>

                    <GoogleLogin
                        clientId={'1085629393718-0cmj5len41g2jeb0pjjh65aistr3gjlm.apps.googleusercontent.com'}
                        render={(renderProps) => (
                            <div className="oauthInnerContainer" onClick={renderProps.onClick}>
                                <img src={'/google.png'} alt=""/>
                                <p className='oauthText'>Sign up with Google</p>
                            </div>
                            )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                <FacebookLogin
                    appId={'356594049214338'}
                    autoLoad
                    render={(renderProps) => (
                        <div className="oauthInnerContainer" onClick={renderProps.onClick}>
                            <img src={'/facebookConnect.png'} alt=""/>
                            <p className='oauthText'>Sign up with Facebook</p>
                        </div>
                    )}
                    fields="name,email,picture"
                   // onClick={componentClicked}
                    callback={responseFacebook} />,

            </div>
            */}

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