import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Button, TextField, Link as MuiLink } from "@material-ui/core";
import styles from "@/styles/Home.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth";
import { makeStyles } from "@material-ui/core/styles";
import Registro from "@/components/Registro";
import Modal from "@material-ui/core/Modal";
import React from "react";
import Divider from "@material-ui/core/Divider";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

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
  formplace: {
    backgroundColor: "#90240E",
    borderRadius: "20px",
    height: "290px",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  colortextfield: {
    backgroundColor: "white",
    borderRadius: "10px",
  },
  divider: {
    backgroundColor: "transparent",
    height: "10px",
  },
  dividerLine: {
    backgroundColor: "white",
    height: "1px",
  },
  textRegister: {
    color: "white",
  },
  butonRegister: {
    color: "white",
  }

}));

const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [result, setResult] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [errorsList, setErrorsList] = useState([]);
  const onSubmit = (formData) => setResult(JSON.stringify(formData));
  const { login } = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Registro />
    </div>
  );

  const onFinishLog = async (formData) => {
    try {
      const userData = {
        ...formData,
      };
      const response = await login(userData);
      console.log("response", response);
      setUserInfo(response.data);

      setResult("User logged in");

      reset();
      // router.push(Routes.HOME);
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;
      setResult("An error has occurred");

      if (response) {
        if (response.data.errors) {
          const errors = response.data.errors;
          // const errorList = Object.values(errors);
          const newErrorList = [];

          for (let field in errors) {
            newErrorList.push(...errors[field]);
          }
          console.log("errorList", newErrorList);

          setErrorsList(newErrorList);
        }
      }
    }
  };

  return (
    <div>
        <div >
          <form
            onSubmit={handleSubmit(onFinishLog)}
            className={classes.formplace}
          >
            <div>
              <Divider className={classes.divider}/>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={classes.colortextfield}
                    label="Correo electr??nico"
                    variant="filled"
                    type="email"
                  />
                )}
                //size="small"
              />
              <p> {errors.email?.message}</p>
            </div>

            <div>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={classes.colortextfield}
                    label="Contrase??a"
                    variant="filled"
                    type="password"
                  />
                )}
                //size="small"
              />
              <p></p>
            </div>
            <div>
              <Button type="submit" variant="contained" color="white">
                Iniciar Sesi??n
              </Button>
              <Divider className={classes.divider}/>
              <Divider className={classes.dividerLine}/>
              <div>
                <p className={classes.textRegister}>
                  ??No tienes cuenta?{" "}
                  <Button onClick={handleOpen} className={classes.butonRegister}>Registrate</Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {body}
                  </Modal>
                </p>
              </div>
            </div>
          </form>
        </div>
      {/* <div className={styles.linea2}></div>
            <div className = {styles.second}>
                <p className={styles.titles}>!Conoce personas a sol un click!</p>
                <p>La ??nica plataforma que te permite chatear de forma exclusiva con estudiantes de la EPN.</p>
            </div>
            <div className={styles.linea2}></div>
            <div className = {styles.third}>
                <p>??Quienes somos?</p>
            </div>
            <div className={styles.linea2}></div>
            <div className = {styles.forth}>
                ??C??mo funciona?
            </div>
            <div className = {styles.fifth}>
            <p>Cont??ctanos</p>
            <p>buhochat@gmail.com</p>
            </div> */}
    </div>
  );
};

export default Login;
