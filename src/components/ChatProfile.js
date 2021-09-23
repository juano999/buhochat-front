import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";
import api from "../api/index";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Image from "next/image";
import defaultImageProfile from "../../public/images/imgperfil.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imageStyles: {
    borderRadius: "150px",
    margin: "0 auto",
  },
  divider: {
    backgroundColor: "transparent",
    height: "15px",
  },
  colorT: {
    backgroundColor: "#7E9AFE",
    borderRadius: "5px",
  },
  interestStyle: {
    borderRadius: "5px",
    backgroundColor: "#7E9AFE",
    width: "540px",
  },
  emailStyles: {
    width: "300px",
    backgroundColor: "#7E9AFE",
    borderRadius: "5px",
  },
}));

const ChatProfile = () => {
  const [userA, setUserA] = useState([]);
  const [userI, setUserI] = useState([]);
  const [idUserA, setidUserA] = useState(0);
  const [result, setResult] = useState([]);
  const classes = useStyles();

  const onSubmit = (formData) => setResult(JSON.stringify(formData));
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onFinish = async (formData) => {
    console.log("Busqueda", formData);
    const newInterest = {
      interest: formData.text,
    };

    const response = await api.put(`/users/${idUserA}`, newInterest);
  };

  async function UserInformation() {
    try {
      const usuario = await api.get(`/user`);
      console.log("usuarioIDlogueado", usuario.data);
      const idUser = usuario.data.id;
      setidUserA(idUser);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    UserInformation();
  }, []);

  useEffect(() => {
    async function getData() {
      const dataUser = await api.get(`/users/${idUserA}`);
      setUserA(dataUser.data);
      console.log("usaurioLogueado", userA);
    }

    getData();
  }, [idUserA]);

  const handleUpdatePhoto = () => {};

  if (!userA) {
    return "Cargando Perfil";
  }

  return (
    <Grid container>
      <h2 id="parent-modal-title">Perfil</h2>
      <Divider />
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          {userA.image ? (
            <Image
              src={userA.image} // Route of the image file
              height={180} // Desired size with correct aspect ratio
              width={150} // Desired size with correct aspect ratio
              alt="Logo"
            />
          ) : (
            <Image
              src={defaultImageProfile} // Route of the image file
              height={180} // Desired size with correct aspect ratio
              width={150} // Desired size with correct aspect ratio
              alt="Logo"
              className={classes.imageStyles}
            />
          )}

          <Button onClick={handleUpdatePhoto}>Actualizar foto de perfil</Button>
          <TextField
            className={classes.emailStyles}
            disabled
            label={userA.email}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField
            className={classes.colorT}
            disabled
            label={userA.nickName}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
          <Divider className={classes.divider} />
          <TextField
            className={classes.colorT}
            disabled
            label={userA.career}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(onFinish)}>
        <Controller
          name="text"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              className={classes.interestStyle}
              {...field}
              required
              label={userA.interest}
              variant="filled"
              type="text"
            />
          )}
        />
        <p></p>
        <Button variant="contained" type="submit">
          {" "}
          Guardar
        </Button>
      </form>
      {/*<Divider className={classes.divider} />*/}
    </Grid>
  );
};

export default ChatProfile;
