import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";



const CompSign = () => {

    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [userError, setUserError] = useState(false)
    const [passError, setPassError] = useState(false)

    useEffect(() => {


        if (localStorage.getItem("token")) {
            navigate('/');
         }
    },);


    const [formValues, setFormValues] = useState({
        nombre_user: '',
        apellido_user: '',
        password_user: '',
        confirm_password_user: '',
        email_user: '',
        telefono_user: ''

    });
    console.log(formValues);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        if (formValues.password_user === formValues.confirm_password_user) {
            e.preventDefault();
            try {
                const response = await axios.post("http://localhost:5000/user/signin", formValues);
                console.log(response);
                if (response.status === 201) {
                    navigate('/login')
                }


            } catch (error) {
                if (error.response.status === 409) {
                    alert("usuario o email ya resgistrados")
                    console.error(error);
                    setUserError(true)
                }
                console.error(error);
            }

        }
        else {
            e.preventDefault(); // Evita que el formulario se envíe y la página se recargue
            alert("las contraseñas no coinciden")
            setPassError(true)
        }
    };

    return isLoggedIn ? (

        <Navigate to="/" />

    ) : (


        <form onSubmit={handleSubmit} className=" flex flex-col items-center justify-center p-4 rounded-lg mt-16">
            <h1 className="text-2xl font-bold mb-4 text-bleu">Crea tu cuenta</h1>
            <div className=" gap-4">
                <div>
                    <label className="block mb-2">
                        <span className="text-gray-700">Nombre:</span>
                        <input
                            type="text"
                            name="nombre_user"
                            value={formValues.nombre_user}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Apellido:</span>
                        <input
                            type="text"
                            name="apellido_user"
                            value={formValues.apellido_user}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Correo electrónico:</span>
                        <input
                            type="email"
                            name="email_user"
                            value={formValues.email_user}
                            onChange={handleChange}
                            className={`w-full mt-1 p-2 border rounded-md focus:ring ${userError ? 'ring-red-200 border-red-500 focus:ring-red-200 focus:border-red-500' : 'ring-blue-200 border-blue-500 focus:ring-blue-200 focus:border-blue-500'}`}
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Contraseña:</span>
                        <input
                            type="password"
                            name="password_user"
                            value={formValues.password_user}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Confirmar contraseña:</span>
                        <input
                            type="password"
                            name="confirm_password_user"
                            value={formValues.confirm_password_user}
                            onChange={handleChange}
                            className={`w-full mt-1 p-2 border rounded-md focus:ring ${passError ? 'ring-red-200 border-red-500 focus:ring-red-200 focus:border-red-500' : 'ring-blue-200 border-blue-500 focus:ring-blue-200 focus:border-blue-500'}`}
                        />
                    </label>


                    <label className="block mb-2">
                        <span className="text-gray-700">Teléfono:</span>
                        <input
                            type="number"
                            name="telefono_user"
                            value={formValues.telefono_user}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                    </label>
                </div>



            </div>
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-jaune hover:text-black transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Enviar
            </button>
        </form>


    );
};

export default CompSign;
