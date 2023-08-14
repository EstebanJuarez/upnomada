import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function CompPopContainer() {
    const [email_user, setEmailUser] = useState("");
    const [password_user, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hayToken, setHaytoken] = useState("")
    const [userRole, setUserRole] = useState("")
    const [datosIncorrectos, setDatosIncorrectos] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {

        const getUserRole = async () => {
            try {
                const res = await axios.get('http://localhost:5000/role/role/', {
                    headers: {
                        "x-auth-token": token
                    }
                });
                const role = res.data.role;
                setUserRole(role);
                console.log(role);
            } catch (error) {
                console.error(error);

            }
        }
        getUserRole()
        if (hayToken) {
            console.log("no hay oken valido");
            console.log(localStorage.getItem("token"));
            localStorage.removeItem("token")
            console.log(localStorage.getItem("token"));

        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email_user) {
            return alert("Ingresa un email")
        }

        if (!password_user) {
            return alert("Ingresa una contraseña")
        }
        try {

            const response = await axios.post("http://localhost:5000/login", {
                email_user,
                password_user,
            });
            if (response.status === 200) {
                setIsLoggedIn(true);
                localStorage.setItem("token", response.data.token);
                window.location.reload(); // <- Recarga la página
            }
            if (response.status === 101) {
                console.log();
                // Token expirado, eliminar token del almacenamiento local
                localStorage.removeItem("token");
                setHaytoken(false)
            }
        } catch (error) {
            setDatosIncorrectos(true)
            console.error(error);

        }
    };

    const logout = () => {
        localStorage.removeItem("token");

        window.location.reload();
    };
    const goToCompras = () => {
        navigate('/perfil')
    }
    const goToAdmin = () => {
        navigate('/admin')
    }



    return token ? (
        <div className="buttons-container">
            <button className='mis-compras-btn' onClick={goToCompras}>Mi perfil</button>
            {userRole === "admin" && (
                <button onClick={goToAdmin} className="mis-compras-btn">Panel de administración</button>
            )}

            <button className='logout-btn' onClick={logout}>Cerrar sesión</button>
        </div >
    ) : (
        <div>
            <form onSubmit={handleSubmit} className="login-form">
                <h1 className="text-center mb-4">Iniciar sesión</h1>

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
                {datosIncorrectos && (

                    <div>
                        <span className="text-sm text-red-500">Datos incorrectos</span>
                    </div>
                )}

             
                    <Link to={'/accounts/password/reset'} className="login-link ">¿Haz olvidado tu contraseña? </Link>
           
                <div>
                    <Link  to={'/signin'} className="login-link">
                        ¿No tenés cuenta? <strong> ¡Creala ahora!</strong>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default CompPopContainer;
