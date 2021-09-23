
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form"
import api from "../api/index";
import { useEffect, useState } from "react";
import Image from "next/image";
import defaultImageProfile from "../../public/images/imgperfil.png";


const ChatProfile2 = ({userShowed}) => {
  const [userI, setUserI] = useState([]);
  const [idUserA, setidUserA] = useState(0);

  async function UserInformation() {
    try {
      const usuario = userShowed;
      setUserI(usuario);
      console.log("USER: ", userI);
    } catch (e) {
      console.log(e)
    }
  }


  




  if(!userShowed){
    return "Cargando Perfil";
  }

  return (
    <Grid container>
      <h2 id="parent-modal-title">Perfil de {userShowed.nickName}</h2>
      <Divider/>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          {userI.image ? 
          <Image
          src={userI.image} 
          height={180}
          width={150} 
          alt="Logo"
        /> : <Image
        src={defaultImageProfile} 
        height={180}
        width={150} 
        alt="Logo"
      />}
        </Grid>
        <Grid item xs={6} md={4}>
        <TextField
          disabled 
          label={userI.email}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
        disabled
          label={userI.career}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        </Grid>
      </Grid>
      <Grid item xs={6} md={4}>
      <TextField
        disabled
          label={userI.interests}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </Grid>         
    </Grid>
  );
};

export default ChatProfile2;
