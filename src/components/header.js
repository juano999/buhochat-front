import Container from '@material-ui/core/Container';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../styles/Home.module.css'
import Image from "next/image";
import ruta1 from "../../public/images/logo.jpeg";


export default function Header() {
    return (
        <Container>
            <Grid container spacing={3} className={styles.header}>
                <Image
                    src={ruta1} // Route of the image file
                    height={10} // Desired size with correct aspect ratio
                    width={150} // Desired size with correct aspect ratio
                    alt="Logo"
                />

            </Grid>
        </Container>
    )
}
