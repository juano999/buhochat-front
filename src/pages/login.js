import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Button, TextField, Link as MuiLink } from "@material-ui/core";
import styles from "./../styles/Home.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth";
import Routes from "../constants/routes";
import Link from "next/Link";
import withoutAuth from "../hocs/withoutAuth";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
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
      router.push(Routes.HOME);
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
      {/* <div className={styles.header}>
                <Image
                    src={ruta1} // Route of the image file
                    height={40} // Desired size with correct aspect ratio
                    width={130} // Desired size with correct aspect ratio
                    alt="Logo"
                />
            </div> */}
      <div className={styles.first}>
        <div className={styles.registerplace}>
          <form
            onSubmit={handleSubmit(onFinishLog)}
            className={styles.formplace}
          >
            <div>
              <p className={styles.sentence}>Inicia Sesión</p>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    className={styles.colortextfield}
                    label="Correo electrónico"
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
                    className={styles.colortextfield}
                    label="Contraseña"
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
                Iniciar Sesión
              </Button>
              <div className={styles.linea}></div>
              <div className={styles.sentence}>
                <p>
                  ¿No tienes cuenta?
                  <Link href="/registro" passHref>
                    <MuiLink> Registrate</MuiLink>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <div className={styles.linea2}></div>
            <div className = {styles.second}>
                <p className={styles.titles}>!Conoce personas a sol un click!</p>
                <p>La única plataforma que te permite chatear de forma exclusiva con estudiantes de la EPN.</p>
            </div>
            <div className={styles.linea2}></div>
            <div className = {styles.third}>
                <p>¿Quienes somos?</p>
            </div>
            <div className={styles.linea2}></div>
            <div className = {styles.forth}>
                ¿Cómo funciona?
            </div>
            <div className = {styles.fifth}>
            <p>Contáctanos</p>
            <p>buhochat@gmail.com</p>
            </div> */}
    </div>
  );
};

export default withoutAuth(LoginPage);
