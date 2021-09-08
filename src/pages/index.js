import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Home from './Home';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },

}));

export default function Index() {

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      {/* header */}
      <Container maxWidth="lg">

        <Home></Home>

      </Container>
      {/*Footer*/}
      { }
    </React.Fragment>
  )
}
