import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import styles from "../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import RegisterPage from "./login";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Box: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "500px",
  },
  divider: {
    backgroundColor: "#052E5E",
    height: "2px",
  },
  grid: {
    marginBottom: "20px",
    marginTop: "20px",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={6}>
          <Box className={classes.Box}>slider</Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.Box}>
            <RegisterPage></RegisterPage>
          </Box>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12}>
          <Box className={classes.Box}>xs=12</Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.Box}>xs=6</Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.Box}>xs=6</Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.Box}>xs=6</Box>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12}>
          <Box className={classes.Box}>xs=12</Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.Box}>xs=6</Box>
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.Box}>xs=6</Box>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12}>
          <Box className={classes.Box}>xs=12</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.Box}>xs=6</Box>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12}>
          <Box className={classes.Box}>xs=12</Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.Box}>xs=6</Box>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />
    </Container>
  );
}
