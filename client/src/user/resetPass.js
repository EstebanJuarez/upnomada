import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const CompResetPass = () => {
    const [step, setStep] = useState(1); // Estado para rastrear el paso actual
    const [email, setEmailUser] = useState("");
    const [recoveryCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false); // Estado para controlar el tiempo de espera



    useEffect(() => {
        const lastRequestTime = localStorage.getItem("lastRequestTime");
        if (lastRequestTime) {
            const currentTime = Date.now();
            const elapsedTime = currentTime - parseInt(lastRequestTime, 10);
            if (elapsedTime < 150000) {
                setIsWaiting(true);
                const remainingTime = 150000 - elapsedTime;
                setTimeout(() => {
                    setIsWaiting(false);
                }, remainingTime);
            }
        }
    }, []);

    const handleSubmitStep1 = async (e) => {
        e.preventDefault();
        if (isWaiting) {
            alert("Debes esperar 2 minutos y medio antes de solicitar otro código");
            return;
        }
        else {

            try {
                // Lógica para enviar el correo y recibir el código de restablecimiento
                await axios.post("http://localhost:5000/recovery-code/create", {
                    email,
                });

                // Si la respuesta es exitosa, avanza al siguiente paso y establece el tiempo de espera
                setStep(2);
                setIsWaiting(true);
                localStorage.setItem("lastRequestTime", Date.now().toString());


                // Restablece el tiempo de espera después de 2.5 minutos (150,000 ms)
                setTimeout(() => {
                    setIsWaiting(false);
                }, 150000);
            } catch (error) {
                alert("Error al enviar el correo");
                console.error(error);
            }
        }
    };
    //FIXME: falta añadir la adverntecia de que tiene que esperar 2 minutos y meidio

    const handleSubmitStep2 = async (e) => {
        e.preventDefault();
        if(!recoveryCode || !newPassword){
            return alert("Completa los campos para continuar")
        }
        try {
            // Lógica para verificar el código de restablecimiento y actualizar la contraseña
            await axios.post("http://localhost:5000/recovery-code/update-password", {
                email,
                recoveryCode,
                newPassword,
            });

            setIsLoggedIn(true);
        } catch (error) {
            alert("Error al verificar el código o actualizar la contraseña");
            console.error(error);
        }
    };

    return isLoggedIn ? (
        <Navigate to="/" />
    ) : (
        <div className="flex flex-col items-center mt-44 mb-96">

            {step === 1 && (
                <form onSubmit={handleSubmitStep1} className="flex flex-col items-center mt-20">
                    <h1 className="text-xl mb-4">Ingresa tu email</h1>
                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 border rounded-md"
                            id="login-name"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmailUser(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Enviar código
                        </button>
                    </div>
                    <span className="text-sm text-gray-400 mt-5">
                        El códido tiene una validez de 5 minutos
                    </span>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmitStep2} className="flex flex-col items-center mt-20">
                    <h1 className="text-xl mb-4">Ingresa el código y tu nueva contraseña</h1>
                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 border rounded-md"
                            type="text"
                            placeholder="Código de restablecimiento"
                            value={recoveryCode}
                            onChange={(e) => setResetCode(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 border rounded-md"
                            type="password"
                            placeholder="Contraseña nueva"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Restablecer contraseña
                        </button>
                    </div>
                </form>
            )}

        </div>
    );
};

export default CompResetPass;
