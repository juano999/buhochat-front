import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import Link from "next/link";
import { useAuth } from "@/contexts/auth";
import withoutAuth from "../hocs/withoutAuth";
import { makeStyles } from "@material-ui/core/styles";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un correo válido")
    .required("Este campo obligatorio"),
  nickName: yup.string().required("Este campo obligatorio"),
  password: yup
    .string()
    .min(6, "Ingrese al menos 8 caracteres")
    .required("Este campo obligatorio"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las claves no coinciden")
    .required("Este campo obligatorio"),
    career: yup
    .string()
    .required("Este campo obligatorio"),
    interest: yup
    .string()
    .required("Este campo obligatorio"),
});

const useStyles = makeStyles((theme) => ({
  fields: {
    textAlign: "center",
  },
  butonColor: {
    backgroundColor: "black",
  },
}));

const RegisterPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { register } = useAuth();
  const classes = useStyles();

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Enviando los datos...");

    try {
      const userData = {
        ...formData,
      };

      const str = userData.email;
      const regex = new RegExp(".*@epn.edu.ec$");

      if (regex.test(str)) {
        const response = await register(userData);
        setUserInfo(response.data);
        setResult("Usuario registrado correctamente");
        reset();
      } else {
        alert("Este correo no pertence a la Escuela Polotécnica Nacional");
        setResult("Tu correo debe tener la extención epn.edu.ec");
      }
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;
      setResult("Ocurrió un error :(");

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
    <div className={classes.fields}>
      <h1>REGÍSTRATE</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="Correo electrónico"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <Controller
            name="nickName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="NickName"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <Controller
            name="career"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Carrera"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <Controller
            name="interest"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Interes"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Contraseña"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <Controller
            name="password_confirmation"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Confirma tu contraseña"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.password_confirmation?.message}</p>
        </div>

        <p>{result}</p>
        {console.log("resultado", result)}
        {userInfo && (
          <div>
            <div>Nombre: {userInfo.name}</div>
            <div>Token: {userInfo.token}</div>
          </div>
        )}

        {errorsList.length > 0 && (
          <ul>
            {errorsList.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.butonColor}
        >
          Registrarme
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
