import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";



const CompLogin = () => {



    useEffect(() => {


        // if (localStorage.getItem("token")) {
        //     navigate('/');
        // }
    },);



    const [email_user, setEmailUser] = useState("");
    const [password_user, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {

        console.log("email "+email_user);

        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:5000/login", {
                email_user:email_user,
                password_user,
            });
            console.log(response);
            if (response.status === 200) {
                setIsLoggedIn(true);
                localStorage.setItem("token", response.data.token);

                const mitoken = localStorage.getItem("token")
                console.log("este es mi conso" + mitoken)
            }
         
        } catch (error) {

            console.error(error);
        }
    };

    return isLoggedIn ? (

        <Navigate to="/" />

    ) : (


        <form onSubmit={handleSubmit} className="login-form">
            <h1 className="app-title">Iniciar sesión</h1>


            <div className="login-group">
                <input
                    className="login-field"
                    id="login-name"
                    type="email"
                    placeholder="Email"
                    value={email_user}
                    onChange={(e) => setEmailUser(e.target.value)}
                />

            </div>
            <div className="login-group">
                <input
                    className="login-field"
                    id="login-pass"
                    type="password"
                    placeholder="Contraseña"
                    value={password_user}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>
                <br></br>
                <button type="submit" className="btn-ingresar">Ingresar</button>
            </div>
        </form>

    );
};

export default CompLogin;
