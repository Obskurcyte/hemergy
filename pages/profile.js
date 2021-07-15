import React, {useState, useEffect} from 'react';
import Header from "../components/Header";
import Avatar from '@material-ui/core/Avatar';
import {Formik} from "formik";
import PurpleButton from "../components/PurpleButton";
import Footer from "../components/Footer";

const Profile =  () => {

    const initialValues = {
        email: '',
        phone: '',
    }

    const [dataUser, setDataUser] = useState(null);

    useEffect(() => {
        if ( process.browser) {
            let userData = localStorage.getItem('userDataHemergy');
            const trueData = JSON.parse(userData);
            setDataUser(trueData)
        }
    }, []);
    console.log(dataUser)

    return (
        <div>
            <Header />

            <div className="flex my-5 profileContainer2">
                <div className="flex-column ml-5">
                    <h1>My Profile</h1>
                    <h4>Account data</h4>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => {
                            console.log(values)
                        }}
                    >

                        {props => (
                            <div className="profileContainer">
                                <div className="row">
                                    <div className="col">

                                        <div className="creditCardInput flex pl-3 pt-2 pb-2">
                                            <img src={'/Profile.png'} alt="" className='img-checkout img-profile'/>
                                            <input
                                                type="text"
                                                placeholder={dataUser ? dataUser.name : "Your name"}
                                                className="inputCheckout mt-1 mb-1 nameInput"
                                                value={props.values.name}
                                                onChange={props.handleChange('name')}
                                            />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="creditCardInput flex pl-3 pt-2 pb-2">
                                            <img src={'/Call.png'} alt="" className='img-checkout img-profile'/>
                                            <input
                                                type="text"
                                                placeholder="Your phone number"
                                                className="inputCheckout mt-1 mb-1 nameInput"
                                                value={props.values.name}
                                                onChange={props.handleChange('name')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="creditCardInput flex pl-3 pt-2 pb-2">
                                            <img src={'/email.png'} alt="" className='img-checkout img-profile'/>
                                            <input
                                                type="text"
                                                placeholder={dataUser ? dataUser.email : "Your email"}
                                                className="inputCheckout mt-1 mb-1 nameInput"
                                                value={props.values.name}
                                                onChange={props.handleChange('name')}
                                            />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="creditCardInput flex pl-3 pt-2 pb-2">
                                            <img src={'/LocationProfile.png'} alt="" className='img-checkout img-profile'/>
                                            <input
                                                type="text"
                                                placeholder="Your address"
                                                className="inputCheckout mt-1 mb-1 nameInput"
                                                value={props.values.name}
                                                onChange={props.handleChange('name')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="my-5">
                                    <h4>Change Password</h4>
                                    <div className="creditCardInput flex pl-3 pt-2 pb-2 changePassword">
                                        <img src={'/PasswordProfile.png'} alt="" className='img-checkout img-profile'/>
                                        <input
                                            type="text"
                                            placeholder="Current password"
                                            className="inputCheckout mt-1 mb-1"
                                            value={props.values.name}
                                            onChange={props.handleChange('name')}
                                        />
                                    </div>
                                    <div className="creditCardInput flex pl-3 pt-2 pb-2 changePassword">
                                        <img src={'/PasswordProfile.png'} alt="" className='img-checkout img-profile'/>
                                        <input
                                            type="text"
                                            placeholder="New password"
                                            className="inputCheckout mt-1 mb-1"
                                            value={props.values.name}
                                            onChange={props.handleChange('name')}
                                        />
                                    </div>
                                </div>

                                <PurpleButton title="Save" id="profileSave"/>
                            </div>
                        )}
                    </Formik>
                </div>


            </div>
            <div className="Miniblanck">

            </div>
            <Footer />
        </div>
    );
};

export default Profile;