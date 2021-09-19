import Container from "@material-ui/core/Container";
import React from "react";
import Grid from "@material-ui/core/Grid";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import ruta1 from "../../public/images/logo.jpeg";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  selectOptions: {
    textAlign: "right",
  },
  textAlignformControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    backgroundColor: "#FFFFFF",
    borderRadius: "13px",
    width: "130px",
    height: "30px",
  },
  formControl: {
    textAlign: "right",
  },
  colorMenu: {
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  divider: {
    backgroundColor: "#052E5E",
    height: "15px",
  },
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div className={styles.header}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Image
              src={ruta1} // Route of the image file
              height={65} // Desired size with correct aspect ratio
              width={150} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Grid>
          {/*<Grid item xs={6} className={classes.selectOptions}>
            <FormControl className={classes.formControl}>
              <Divider className={classes.divider} />
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.colorMenu}
              >
                Vicky678
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Ver perfil</MenuItem>
                <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
              </Menu>
            </FormControl>
          </Grid>*/}
        </Grid>
      </Container>
    </div>
  );
}
