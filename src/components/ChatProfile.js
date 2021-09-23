import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from "react-hook-form"
import api from "../api/index";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Image from "next/image";
import defaultImageProfile from "../../public/images/imgperfil.png";



const ChatProfile = () => {
  const [userA, setUserA] = useState([]);
  const [userI, setUserI] = useState([]);
  const [idUserA, setidUserA] = useState(0);
  const [result, setResult] = useState([]);
    const onSubmit = (formData) => setResult(JSON.stringify(formData))
    const {
      handleSubmit,
      formState: { errors },
      reset,
      control,
  } = useForm();


  const onFinish = (formData) => {
    console.log('Busqueda', formData);
}


  async function UserInformation() {
    try {
      const usuario = await api.get(`/user`);
      console.log("usuarioIDlogueado", usuario.data);
      const idUser = usuario.data.id;
      setidUserA(idUser);
      const dataUser = await api.get(`/users/${idUser}`);
      const interest = await api.get(`/interests/${idUser}`);
      setUserI(interest.data);
      setUserA(dataUser.data);
      console.log("usaurioLogueado", userA);
      
    } catch (e) {
      console.log(e)
    }
  }

  async function newInterest() {
    const newInt = document.getElementById("interestUser").value;
    const newJsonInt = '{"text":"newInt"}';
    var valueIn = JSON.parse(newJsonInt);
    var jsonFormateado = JSON.stringify(valueIn, null, '\t');
    console.log("interes", jsonFormateado);
    const response = await api.post(`/interests/${idUserA}`, jsonFormateado);
  }

  useEffect(() => {
    UserInformation();
}, [])


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
          src={userA.image} // Route of the image file
          height={180} // Desired size with correct aspect ratio
          width={150} // Desired size with correct aspect ratio
          alt="Logo"
        /> : <Image
        src={defaultImageProfile} // Route of the image file
        height={180} // Desired size with correct aspect ratio
        width={150} // Desired size with correct aspect ratio
        alt="Logo"
      />}
            
            <Button onClick={handleUpdatePhoto}>Actualizar foto de perfil</Button>
            <TextField
          disabled 
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
          label={userA.nickName}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
        disabled
          label={userA.career}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(onFinish)}>
                        <Controller
                            name="text"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField
                              {...field}
                              required
                              label={userI.text}
                              variant="filled"
                              type="text"
                            />
                            )}
                        />
                        <p></p>
                        <Button variant="contained" type="submit"> Guardar</Button>
                    </form>
    </Grid>
  );
};

export default ChatProfile;
