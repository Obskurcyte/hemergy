import React, {useState, useEffect} from 'react';
import Header from "../components/Header";
import Avatar from '@material-ui/core/Avatar';
import {Formik} from "formik";
import PurpleButton from "../components/PurpleButton";
import Footer from "../components/Footer";
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";

const Profile =  () => {

    const [dataUser, setDataUser] = useState(null);

    useEffect(() => {
        if ( process.browser) {
            let userData = localStorage.getItem('userDataHemergy');
            const trueData = JSON.parse(userData);
            setDataUser(trueData)
        }
    }, []);
    console.log(dataUser)

    const initialValues = {
        email: '',
        phone: '',
        name: '',
        address: '',
        currentPassword: '',
        newPassword: ''
    }



    function SimpleDialog(props) {
        const { onClose, selectedValue, open } = props;

        const handleClose = () => {
            onClose(selectedValue);
        };


        return (
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <div className="dialog-container">
                    <div className="dialog-img-container">
                        <img src={'/oksquare.png'} alt=""/>
                    </div>
                    <h3 className='messageSent'>Updated !</h3>
                    <p className="dialog-paragraph">Your profile has been updated</p>
                    <PurpleButton title="See the projects" id="sendButton" href={"/projects"}/>
                </div>
            </Dialog>
        );
    }


    const [open, setOpen] = React.useState(false);

    console.log(open)


    const handleClose = (value) => {
        setOpen(false);
    };


    return (
        <div>
            <Header />

            <div className="flex my-5 profileContainer2">
                <div className="flex-column ml-5">
                    <h1>My Profile</h1>
                    <h4>Account data</h4>
                    {dataUser ? <Formik
                        initialValues={initialValues}
                        onSubmit={async values => {
                            await axios.post('api/profile/updateUser', {
                                email: dataUser.email,
                                phone: values.phone,
                                name: values.name,
                                adress: values.adress,
                                newEmail: values.email,
                                password: values.newPassword
                            })
                            setOpen(true)
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
                                                value={props.values.phone}
                                                onChange={props.handleChange('phone')}
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
                                                value={props.values.email}
                                                onChange={props.handleChange('email')}
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
                                                value={props.values.address}
                                                onChange={props.handleChange('address')}
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
                                            value={props.values.currentPassword}
                                            onChange={props.handleChange('currentPassword')}
                                        />
                                    </div>
                                    <div className="creditCardInput flex pl-3 pt-2 pb-2 changePassword">
                                        <img src={'/PasswordProfile.png'} alt="" className='img-checkout img-profile'/>
                                        <input
                                            type="text"
                                            placeholder="New password"
                                            className="inputCheckout mt-1 mb-1"
                                            value={props.values.newPassword}
                                            onChange={props.handleChange('newPassword')}
                                        />
                                    </div>
                                </div>

                                <PurpleButton title="Save" id="profileSave" href="javascript:void(0)" onClick={props.handleSubmit}/>
                            </div>
                        )}
                    </Formik> : ''}

                    <SimpleDialog open={open} onClose={handleClose} />
                </div>


            </div>
            <div className="Miniblanck">

            </div>
            <Footer />
        </div>
    );
};

export default Profile;