import Container from '@material-ui/core/Container';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../../styles/Home.module.css'
import Image from "next/image";
import ruta1 from "../../../public/images/logo.jpeg";




export default function Footer() {
    return (
        <div className={styles.footer}>
            <Container>
            <Grid item xs={12} >
                <p>Escuela de Formación de Tecnólogos - Escuela Politécnica Nacional </p>
            </Grid>
            </Container>
        </div>
    )
}