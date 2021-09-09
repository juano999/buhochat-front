import Container from "@material-ui/core/Container";
import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Image from "next/image";
import ruta1 from "../../public/images/imagen.png";
import ruta2 from "../../public/images/logo.jpeg";
import ruta3 from "../../public/images/1.png";
import ruta5 from "../../public/images/chat.png";
import ruta6 from "../../public/images/im.jpg";
import ruta7 from "../../public/images/group.png";
import ruta8 from "../../public/images/2.png";
import ruta9 from "../../public/images/3.png";
import ruta10 from "../../public/images/4.png";
import ruta11 from "../../public/images/5.png";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailIcon from "@material-ui/icons/Mail";
import SchoolIcon from "@material-ui/icons/School";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Login from "./Login";
import Registro from "./Registro";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Box: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "380px",
  },
  divider: {
    backgroundColor: "#000000",
    height: "2px",
  },
  dividerTransparent: {
    backgroundColor: "transparent",
    height: "20px",
  },
  grid: {
    marginBottom: "20px",
    marginTop: "20px",
  },
  siteSesion: {
    textAlign: "center",
  },
  formplace: {
    backgroundColor: "#90240E",
    borderRadius: "20px",
    height: "290px",
  },
  titles: {
    fontSize: "50px",
    color: "#091D4B",
    textAlign: "center",
  },
  colorp: {
    color: "#FFFFFF",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  icons: {
    color: "#2E73A8",
  },
  colortextfield: {
    backgroundColor: "white",
    borderRadius: "10px",
  },
  sentence: {
    color: "white",
    textAlign: "center",
  },
  second: {
    textAlign: "center",
  },
}));

export default function Body() {
  const classes = useStyles();
  const [result, setResult] = useState("");
  const { register, handleSubmit, control } = useForm();
  const onSubmit = (formData) => setResult(JSON.stringify(formData));
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Registro />
    </div>
  );

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1} className={classes.grid}>
        <Grid item xs={6}>
          <Box className={classes.Box}>
            <Image
              src={ruta1} // Route of the image file
              height={370} // Desired size with correct aspect ratio
              width={370} // Desired size with correct aspect ratio
              alt="banner1"
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Grid xs={12} className={classes.siteSesion}>
            <Image
              src={ruta2} // Route of the image file
              height={70} // Desired size with correct aspect ratio
              width={150} // Desired size with correct aspect ratio
              alt="Logo"
            />
            <Login />
          </Grid>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={12}>
          <Box>
            <div className={classes.second}>
              <h1 className={classes.titles}>
                !Conoce personas a solo un click!
              </h1>
              <p>
                La única plataforma que te permite chatear de forma exclusiva
                con estudiantes de la EPN.
              </p>
            </div>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.Box}>
            <Image
              src={ruta5} // Route of the image file
              height={150} // Desired size with correct aspect ratio
              width={150} // Desired size with correct aspect ratio
              alt="chat"
            />
            <p>
              Conoce a mas personas creando chats aleatorios con estudiantes de
              la EPN.
            </p>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.Box}>
            <Image
              src={ruta6} // Route of the image file
              height={150} // Desired size with correct aspect ratio
              width={150} // Desired size with correct aspect ratio
              alt="mulimedia"
            />
            <p>
              Envía imagenes y videos a todos tus chats haciendo más interactiva
              tu comunicación.
            </p>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className={classes.Box}>
            <Image
              src={ruta7} // Route of the image file
              height={150} // Desired size with correct aspect ratio
              width={150} // Desired size with correct aspect ratio
              alt="gruop"
            />
            <p>
              Comparte tus intereses con los demas usuariosy crea tu propia
              lista de amigos
            </p>
          </Box>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={12}>
          <h1 className={classes.titles}>¿Cómo funciona?</h1>
          <Box className={classes.Box}>
            <Image
              src={ruta3} // Route of the image file
              height={330} // Desired size with correct aspect ratio
              width={1330} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box className={classes.Box}>
            <Image
              src={ruta8} // Route of the image file
              height={330} // Desired size with correct aspect ratio
              width={1330} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.Box}>
            <Image
              src={ruta9} // Route of the image file
              height={330} // Desired size with correct aspect ratio
              width={1330} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.Box}>
            <Image
              src={ruta10} // Route of the image file
              height={330} // Desired size with correct aspect ratio
              width={1330} // Desired size with correct aspect ratio
              alt="Logo"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.Box}>
            <Image
              src={ruta11} // Route of the image file
              height={330} // Desired size with correct aspect ratio
              width={1330} // Desired size with correct aspect ratio
              alt="Logo"
            />
            <Divider className={classes.dividerTransparent} />
            <Button variant="outlined" color="primary" onClick={handleOpen}>
              Registrarse Ahora
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={12}>
          <Box className={classes.Box}>
            <Divider className={classes.divider} />
            <h1 className={classes.titles}>Contáctanos</h1>
            <p>buhochat@gmail.com</p>
            <FacebookIcon className={classes.icons} fontSize="large" />
            <MailIcon className={classes.icons} fontSize="large" />
            <SchoolIcon className={classes.icons} fontSize="large" />
            <WhatsAppIcon className={classes.icons} fontSize="large" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
