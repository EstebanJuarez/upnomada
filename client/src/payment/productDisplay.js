import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


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

                        <div className="fixed bottom-0 px-40 bg-[rgba(255,255,255,0.2)] text-white text-sm">
                            <p className="mb-4">
                                <span className="font-bold">Aviso Legal:</span> Upnomada no es una agencia de viajes, sino una plataforma que busca
                                vuelos y que te permite acceder directamente a las mejores ofertas. Nuestra plataforma solo te brinda la posibilidad
                                de disfrutar de precios baratos al ofrecerte enlaces directos a la compra de vuelos. ¡Empieza a explorar el mundo y
                                ahorra con Upnomada!
                            </p>

                            <p className="mb-4">
                                <span className="font-bold">AVISO IMPORTANTE:</span> Ten en cuenta la fecha de publicación de las ofertas de vuelo en
                                Upnomada, ya que los precios pueden cambiar con el tiempo. Para asegurarte de disfrutar de las mejores ofertas, te
                                recomendamos estar atento y acceder a los enlaces lo más pronto posible. ¡No dejes pasar la oportunidad de volar al
                                mejor precio con Upnomada!
                            </p>

                            <p className="mb-4">
                                <span className="font-bold">¡Atención viajero!</span> Antes de reservar tu vuelo, te recomendamos leer detenidamente
                                los detalles del boleto con la aerolínea. Así evitarás sorpresas desagradables y tendrás una experiencia de viaje sin
                                contratiempos. ¡Viajar con claridad es viajar con tranquilidad! 🧳✈️
                            </p>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </section >
    );
}

export default CompProductDisplay;
