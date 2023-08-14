import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStripe } from "@fortawesome/free-brands-svg-icons"; // Importa el icono de Stripe


const CompProductDisplay = ({ isModalOpen, setIsModalOpen }) => {
    const modalVariants = {
        hidden: {
            opacity: 0,
            y: -100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
            y: -100,
            transition: {
                duration: 0.3,
            },
        },
    };

    const navigate = useNavigate()
    const handleCheckout = async () => {
        const token = localStorage.getItem("token")
        try {
            // Realiza la solicitud POST a la URL '/create-checkout-session' con Axios
            const response = await axios.post(
                'http://localhost:5000/stripe/create-checkout-session',
                {},
                {
                    headers: {
                        'x-auth-token': token,
                    },
                }
            );
            // El código a continuación dependerá de la respuesta de la solicitud
            // Puedes redirigir al usuario a la página de pago o realizar otras acciones
            console.log(response.data);

            const sessionUrl = response.data; // La URL de la sesión proporcionada por la API

            // Redirigir al usuario a la URL de la sesión de Checkout
            window.location.href = sessionUrl;
        } catch (error) {
            navigate('/signin')

            console.error('Error al procesar la solicitud de checkout:', error);
        }
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="flex justify-center flex-col items-center " >
            <AnimatePresence>

                {isModalOpen && (
                    <motion.div
                        className="flex justify-center flex-col items-center modal-container"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >


                        <div className="flex flex-col bg-bleu justify-center align-middle  max-w-sm p-10 rounded-lg ">
                            <div className="absolute top-0 right-0 mr-4 mt-4">
                                <button onClick={handleCloseModal} className="bg-bleu p-3 rounded text-white ">Cerrar</button>
                            </div>
                            <img
                                className="w-36 h-36 object-cover rounded"
                                src="http://localhost:5000/plan.jpeg"
                                alt="The cover of Stubborn Attachments"
                            />
                            <div className="flex flex-col gap-5 py-5 ">
                                <p className="text-white text-xl">Plan base</p>
                                <p className="text-gray-300">¡Suscríbete a Upnomada y vuela con las mejores ofertas! Descubre el mundo a precios increíbles.</p>
                                <div className="flex gap-2">
                                    <del className="text-red-400 text-sm ">$10.00</del>
                                    <span className="text-white text-3xl ">$8.00</span>
                                    <span className="text-white text-xs w-1 ">al mes</span>
                                </div>
                            </div>


                            <button type="button"
                                className="bg-[rgb(37,97,117)] py-2 rounded text-white hover:bg-jaune transition-all hover:text-black"
                                onClick={handleCheckout}>
                                Suscriberse
                            </button>
                        </div>

                        <div className="fixed bottom-0  bg-[rgba(255,255,255,0.2)] text-white text-sm  md:px-40">
                            <FontAwesomeIcon icon={faStripe} className="ml-2 text-blue-400 text-6xl" />
                            <p className="mb-4">
                                En <b>Upnomada.com</b>, tu seguridad es nuestra prioridad. Por eso, utilizamos <b>Stripe</b>, una de las plataformas de pago más seguras y confiables del mundo. Puedes realizar tus transacciones con total tranquilidad, sabiendo que tus datos están protegidos con los más altos estándares de seguridad. ¡Tu satisfacción y seguridad son nuestra garantía!{" "}

                            </p>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </section >
    );
}

export default CompProductDisplay;
