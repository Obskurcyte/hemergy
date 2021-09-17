import React from 'react';
import Head from "next/head";
import styles from '../styles/Home.module.css'
import PurpleButton from "../components/PurpleButton";
import WhiteButton from "../components/WhiteButton";
import Header from "../components/Header";
import ReactPlayer from 'react-player'
import Footer from "../components/Footer";
import {useSession} from "next-auth/client";
import {useTranslation} from "react-i18next";
import {Formik} from "formik";
import axios from 'axios';
import {useRouter} from "next/router";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

export default function Home() {

    const { t, i18n } = useTranslation();


    const router = useRouter()

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
                    <h3 className='messageSent'>Message Sent !</h3>
                    <p className="dialog-paragraph">Your message has been successfully sent</p>
                    <PurpleButton title="See the projects" id="sendButton" href={"javascript:void(0)"} onClick={() => router.push('/projects')}/>
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
      <Head>
        <title>Hemergy - Index</title>
      </Head>

      <Header accueil={true}/>
      <div className="headTitle">
        <h1 className='mainTitle'>{t('Index1')}</h1>
        <h3>{t('Index2')}</h3>
        <div className="buttonContainer">
          <PurpleButton title={t('Index3')} id="learnMore"/>
          <WhiteButton title={t('Index4')} id="indexAvailable" href={'/projects'}/>
        </div>
      </div>

        <img src={'/imageAccueil.svg'} alt="" className="imgAccueil"/>

        <div className="howItWorks">
            <h5>{t('Index5')}</h5>
            <h4>{t('Index6')}</h4>
            <p>{t('Index7')}</p>
        </div>
        
        <div className="video">
            <ReactPlayer
                url="https://www.youtube.com/watch?v=Ndu9H4ImNAU&ab_channel=Hemergy"
                className="video-presentation"
                playing
                controls={true}
                height="500px"
                width="100%"
                loop
                playIcon={<img src={'/PhotoVideo2.png'} alt=""/>}
                light="/overlayVideo.webp"
            />
        </div>

        <div className="contributorsContainer">
            <div className="contributorInner">
                <div>
                    <div className="contributorMini">
                        <h5>{t('Index8')}</h5>
                        <h4>{t('Index9')}</h4>
                        <p>{t('Index10')}
                            <br/>{t('Index11')}</p>
                    </div>
                    <PurpleButton title={t('Index42')} id="StartJourney1"/>
                </div>
                <img src={"/photoEolienne.png"} alt=""/>
                <PurpleButton title={t('Index42')} id="StartJourney2"/>
            </div>

            <div className="contributorInner2">
                <PurpleButton title={t('Index42')} id="StartJourney2"/>

                <img src={"/panneauSolaire.png"} alt="" className='imgEolienne'/>
                <div className="innerEolienneContainer">
                    <div className="contributorMini2">
                        <h5>{t('Index12')}</h5>
                        <h4>{t('Index13')}</h4>
                        <p>{t('Index14')}
                            <br/>{t('Index15')}</p>
                    </div>
                    <PurpleButton title={t('Index42')} id="StartJourney1"/>
                </div>
            </div>
        </div>


        <div className="ecosystemContainer aboutContainer" id="aboutUs">
            <h5>{t('Index24')}</h5>
            <h4>{t('Index25')}</h4>
            <div className="ecosystemInner">
                <div className="ecosystemMini">
                    <h3>{t('Index26')}</h3>
                    <p>{t('Index27')}
                        <br/>{t('Index28')}
                    </p>
                </div>
                <img src={"/energyAsset.png"} alt=""/>
            </div>

            <div className="ecosystemInner2">
                <img src={"/eolienne.png"} alt=""/>
                <div className="ecosystemMini2">
                    <h3>{t('Index29')}</h3>
                    <p>{t('Index30')}
                    <br/>{t('Index31')}</p>
                </div>
            </div>
            <PurpleButton title={t('Index44')} id="apiButton"/>
        </div>

        <div className="reasonContainer">
            <h5>{t('Index32')}</h5>
            <h4>{t('Index33')}</h4>
            <div className="flexContainer">
                <div className="whyContainer">
                    <img src={'/why.png'} alt="" className='whatImage'/>
                    <h4>{t('Index34')}</h4>
                    <p>{t('Index35')}</p>
                </div>
                <div className="whyContainer">
                    <img src={'/how.png'} alt="" className='whyImage'/>
                    <h4>{t('Index36')}</h4>
                    <p>{t('Index37')}</p>
                </div>
                <div className="whyContainer">
                    <img src={'/what.png'} alt="" className='whyImage'/>
                    <h4>{t('Index38')}</h4>
                    <p>{t('Index39')}</p>
                </div>
            </div>
        </div>

        <div className="contactContainer" id="contact">
            <h4>{t('Index40')}</h4>
            <p>{t('Index41')}</p>
            <Formik
                initialValues={{
                    nom: '',
                    email: '',
                    message: ''
                }}

                onSubmit={async (values) => {

                    try {
                        await axios.post('api/send-email', {
                            nom: values.nom,
                            email: values.email,
                            message: values.message

                    })
                        setOpen(true)
                    } catch (err) {
                        console.log(err)
                    }

                }}

            >

                {props => (
                    <div>
                        <div className="inputFlex">
                            <div className="nameInput contactInput">
                                <img src={'/profile.png'} alt="" />
                                <input
                                    type="text"
                                    placeholder={t('Index45')}
                                    value={props.values.nom}
                                    onChange={props.handleChange('nom')}
                                />
                            </div>
                            <div className="contactInput">
                                <img src={'/Message.png'} alt="" />
                                <input
                                    type="email"
                                    placeholder={t('Index46')}
                                    value={props.values.email}
                                    onChange={props.handleChange('email')}
                                />
                            </div>
                        </div>
                        <div className="bigInput">
                            <div className="placeholderContainer">
                                <img src={'/Edit.png'} alt=""/>
                                <textarea
                                    placeholder={t('Index47')}
                                    value={props.values.message}
                                    onChange={props.handleChange('message')}
                                />
                            </div>
                        </div>
                        <PurpleButton title={t('Index48')} id="sendMessage" onClick={props.handleSubmit} href='javascript:void(0)'/>
                    </div>
                )}
            </Formik>
            <SimpleDialog open={open} onClose={handleClose} />

        </div>

        <Footer />

    </div>
  )
}
