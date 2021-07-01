import React from 'react';
import Link from "next/link";
import styles from './PurpleButton.module.css';


const PurpleButton = (props) => {
    return (
        <div className={styles.buttonContainer} style={props.style} id={props.id} onClick={props.onClick}>
            <Link href={`${props.href}`}><p className={styles.buttonText}>{props.title}</p></Link>
        </div>
    );
};




export default PurpleButton;