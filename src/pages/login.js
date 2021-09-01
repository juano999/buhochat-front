import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Button, TextField } from '@material-ui/core';
import styles from "./../styles/Home.module.css";
import Image from "next/image";
import ruta1 from "../../public/vercel.svg";
import ruta2 from "../../public/vercel.svg";


const LoginPage = () => {

    const { register, handleSubmit, control } = useForm();
    const [result, setResult] = useState("");
    const onSubmit = (formData) => setResult(JSON.stringify(formData));

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

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.formplace}>
                        <div>
                            <p className={styles.sentence}>Inicia Sesión</p>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <TextField {...field} className={styles.colortextfield} label="Correo electrónico" variant="filled" type="email" />}
                            //size="small"

                            />
                            <p></p>
                        </div>

                        <div>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <TextField {...field} className={styles.colortextfield} label="Contraseña" variant="filled" type="password" />}
                            //size="small"
                            />
                            <p></p>
                        </div>
                        <div>
                            <Button type="submit" variant="contained" color="white" >Iniciar Sesión</Button>
                            <div className={styles.linea}></div>
                            <div className={styles.sentence}>
                                <p>¿No tienes cuenta? Registrate</p>

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

export default LoginPage;