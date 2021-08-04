import React from 'react';
import Link from "next/link";
import styles from './PurpleButton.module.css';


const PurpleButton = ({style, id, onClick, href, as, title, ...rest}) => {
    return (
        <div className={styles.buttonContainer} style={style} id={id} onClick={onClick} {...rest}>
            <Link href={`${href}`} as={`${as}`}><p className={styles.buttonText}>{title}</p></Link>
        </div>
    );
};




export default PurpleButton;