import React from 'react';
import Link from "next/link";
import styles from './WhiteButton.module.css';

const WhiteButton = (props) => {
    return (
        <div className={styles.buttonContainer} style={props.style} id={props.id}>
            <Link href={`${props.href}`}><p className={styles.buttonText}>{props.title}</p></Link>
        </div>
    );
};

export default WhiteButton;