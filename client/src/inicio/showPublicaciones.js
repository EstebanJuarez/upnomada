import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate, } from "react-router-dom";

import CompProductDisplay from "../payment/productDisplay";
function CompShowPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldModalOpen, setShouldModalOpen] = useState(false);

  const token = localStorage.getItem("token")
  // Función asincrónica para obtener las publicaciones con sus vuelos y segmentos asociados
  const obtenerPublicaciones = async () => {
    try {
      const response = await axios.get("http://localhost:5000/publicaciones/lastPublicaciones");
      const data = response.data.publicaciones;
      setPublicaciones(data);
      console.log(data);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
    }
  };
  useEffect(() => {

    if (!token) {
      setShouldModalOpen(true)

    }

    obtenerPublicaciones();
  }, []);


  const [hoveredOffer, setHoveredOffer] = useState(null);

  const handleOfferHover = (index) => {
    setHoveredOffer(index);
  };

  const handleOfferLeave = () => {
    setHoveredOffer(null);
  };
  return (
    <>
      <div className="parallax">
        <div className="container mx-auto  px-24 py-32 text-jaune ">
          <svg className="avion" width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.00083 12.8509L3.04006 21.1123C2.59927 22.9674 1.33492 26.4808 0.908802 28.279C0.445824 30.2328 1.03719 30.2288 1.21311 30.2867C1.38904 30.3446 2.9248 30.2751 3.46031 30.2714C3.9334 30.2682 4.35182 30.088 4.47306 29.969L7.99091 24.0933L16.8555 24.2695C15.001 29.0502 11.2284 38.7895 10.974 39.5005C10.7196 40.2116 11.202 40.622 11.475 40.7384C11.7106 40.7762 12.4528 40.8854 13.3068 40.7851C14.5076 40.6439 14.5925 40.599 14.735 40.4207L26.1444 24.029L37.8564 23.8312C46.6502 22.1164 41.8414 18.1887 37.8231 18.0978L26.3535 18.0575C22.9563 12.8593 16.0931 2.36874 15.8188 1.9923C15.5444 1.61587 15.2797 1.48368 15.1817 1.46465C14.9451 1.46626 14.2476 1.45917 13.3499 1.41799C12.4522 1.3768 11.9774 1.91989 11.8522 2.19659L16.9493 18.1806L8.07884 18.2408L5.13742 12.941C4.8034 12.1157 4.58706 12.0975 4.44858 12.1181L1.61002 12.1374C1.61002 12.1374 0.983595 12.7525 1.00083 12.8509Z" fill="white" stroke="white" />
          </svg>

          <div className="backdrop-blur-sm w-fit">

            <h1 className="text-5xl font-bold mb-4 mt-20 ">Encuentra los mejores vuelos</h1>
            <p className="text-lg">Reserva tus boletos de avión al mejor precio y explora nuevos destinos.</p>
            <button className="mt-6 bg-jaune text-bleu px-6 py-3 rounded-lg shadow-lg hover:shadow-xl">

              Buscar vuelos</button>
          </div>


        </div>

      </div>


      <div className="p-16 flex flex-col items-center">
        <div className="py-20">
          <h1 className="text-5xl text-center text-bleu mb-10">Explora nuestras ofertas</h1>
        </div>

        <CompProductDisplay isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-32">

          {publicaciones.map((publicacion, index) => (
            <Link
              to={shouldModalOpen ? "#" : "/publicacion/" + publicacion.id} // Si shouldModalOpen es true, no redirige a ninguna URL
              key={publicacion.id}
              onMouseEnter={() => handleOfferHover(index)}
              onMouseLeave={handleOfferLeave}
              onClick={() => setIsModalOpen(true)} // Aquí abrimos el modal cuando se hace clic en el enlace
            >
              <div
                className={`bg-white rounded  shadow-lg my-4 transition duration-300 transform ${hoveredOffer === index ? 'scale-105' : ''
                  }`}
              >
                <img
                  src={publicacion.imagen}
                  alt={publicacion.titulo}
                  className="w-50 h-50 object-cover rounded mx-auto"
                />

                <div className="p-5">
                  <h2 className="text-xl font-bold mb-2">{publicacion.titulo}</h2>
                  <span className="text-lg font-bold">${publicacion.precio}</span>
                  <br />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link type="submit" className="mt-4 bg-jaune hover:bg-bleu hover:text-white transition-all text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Ver todas
        </Link>
      </div>

      <div className="px-16 py-5 mt-10">
        <div className="flex">
          <div className="bg-blue-50 p-6 w-full md:w-2/4 rounded-md shadow-md mb-8 md:mb-0 md:self-start">
            <div className="relative">
              <img src="http://localhost:5000/2.png" alt="Imagen 2" className="w-1/3 h-auto " />
            </div>
            <h2 className="text-4xl text-blue-500 font-semibold mb-6">¿Qué es Upnomada?</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Upnomada es tu acceso a los vuelos más baratos del mercado. Descubre las mejores tarifas de vuelo que rastreamos y compartimos diariamente.
              Encuentra vuelos económicos y múltiples destinos al precio de un solo boleto. ¡Prepárate para despegar hacia nuevas aventuras sin gastar de más!
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-row-reverse">
            <div className="bg-blue-50 p-6 w-full md:w-2/4 rounded-md shadow-md">
              <div className="relative">
                <img src="http://localhost:5000/1.png" alt="Imagen 1" className="w-1/3  h-auto " />
              </div>
              <h2 className="text-4xl text-blue-500 font-semibold mb-6">Únete a Upnomada</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                ¡Tu próxima aventura te espera! Por solo $10 dólares al mes, únete a Upnomada y desbloquea acceso a vuelos baratos y ofertas exclusivas.
                ¡No dejes pasar esta oportunidad única para explorar el mundo sin límites!
              </p>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default CompShowPublicaciones;
