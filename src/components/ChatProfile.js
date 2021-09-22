import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';
import api from "../api/index";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Image from "next/image";
import ruta1 from "../../public/images/logo.jpeg";
import PersonAddIcon from "@material-ui/icons/PersonAdd";


const ChatProfile = () => {
  const [userA, setUserA] = useState([]);
  const [userI, setUserI] = useState([]);


  async function UserInformation() {
    try {
      const usuario = await api.get(`/user`);
      const idUser = usuario.data.id;
      const dataUser = await api.get(`/users/${idUser}`);
      const interest = await api.get(`/interests/${idUser}`);
      setUserA(dataUser.data);
      console.log(userA);
      setUserI(interest.data);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    UserInformation();
}, [])

  const handleUpdate = () => {
    
  };

  const handleUpdatePhoto = () => {
    
  };

  if(!userA){
    return "Cargando Perfil";
  }

  return (
    <Grid container>
      <h2 id="parent-modal-title">Perfil</h2>
      <Divider/>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          {userA.image ? 
          <Image
          src={ruta1} // Route of the image file
          height={180} // Desired size with correct aspect ratio
          width={150} // Desired size with correct aspect ratio
          alt="Logo"
        /> : <PersonAddIcon fontSize="large"
        height={180}
        width={150}
        ></PersonAddIcon>}
            
            <Button onClick={handleUpdatePhoto}>Actualizar foto de perfil</Button>
            <TextField
          id="filled-read-only-input"
          label={userA.email}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        </Grid>
        <Grid item xs={6} md={4}>
        <TextField
        disabled 
        defaultValue= {userA.name}
          id="filled-read-only-input"
          label={userA.name}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-read-only-input"
          label={userA.lastName}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-read-only-input"
          label="Edad"
          defaultValue=""
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-read-only-input"
          label="Apodo"
          defaultValue={userA.nickName}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-read-only-input"
          label="Email"
          defaultValue={userI.text}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        </Grid>
      </Grid>
      <Grid item xs={12}>
      <TextField
          id="filled-read-only-input"
          label="Email"
          defaultValue={userA.email}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        </Grid>
        <Grid item xs={6}>
        <Button onClick={handleUpdate}>Guardar</Button>
        </Grid>
    </Grid>
  );
};

export default ChatProfile;
