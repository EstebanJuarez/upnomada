import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = 'http://localhost:5000/user/user';
const StripeURI = 'http://localhost:5000/stripe/';

function CompShowProfile() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const token = localStorage.getItem("token") || localStorage.getItem("guest-token");

    const getUser = async () => {
        try {
            const response = await axios.get(`${URI}`, {
                headers: {
                    "x-auth-token": token
                }
            })
            setUser(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelSubscription = async () => {
        alert("hola: cancel subscription")
        try {
            const response = await axios.post(
                `${StripeURI}cancel-subscription`, // Corrige el nombre de la ruta
                {},
                {
                    headers: {
                        "x-auth-token": token
                    }
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {

        if (!token) {
            navigate("/login")
        } else {
            getUser()

        }
    }, [])

    return (

        <div className="bg-white p-28 h-screen  ">
            <h1 className="text-3xl font-semibold mb-6 text-center">Mi perfil</h1>
            <div className="shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            value={user.nombre_user}
                            disabled
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <input
                            type="text"
                            value={user.apellido_user}
                            disabled
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input
                            type="text"
                            value={user.telefono_user}
                            disabled
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            type="text"
                            value={user.email_user}
                            disabled
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado de suscripción</label>
                        <input
                            type="text"
                            value={user.status}
                            disabled
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end  ">
                    <button
                        onClick={cancelSubscription}
                        className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
                    >
                       Cancelar suscripción
                    </button>

                </div>
            </div>
        </div>


    );
}

export default CompShowProfile;
