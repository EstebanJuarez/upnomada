import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";

import CompProductDisplay from "../payment/productDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

function CompShowDetallesPublicacion() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [publicacion, setPublicacion] = useState([]);
  const { id } = useParams()
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const obtenerPublicacion = async () => {
    try {
      const response = await axios.get("http://localhost:5000/publicaciones/" + id, {
        headers: {
          'x-auth-token': token,
        }
      });
      const data = response.data.publicacion;
      setPublicacion(data);
      console.log(data.vuelos);
    } catch (error) {
      if (error.response && error.response.status === 402) {

        console.error("La suscripción ha vencido. Por favor, renueve su suscripción para acceder a esta publicación.");
        setIsModalOpen(true)
        // Aquí puedes tomar medidas adicionales si la suscripción ha vencido, como redirigir al usuario a la página de pago, mostrar un mensaje de renovación de suscripción, etc.
      } else {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    // Función asincrónica para obtener las publicaciones con sus vuelos y segmentos asociados
    obtenerPublicacion();

    if (!token) {
      navigate("/suscribirse")

    }
  }, []);

  const Publicacion = ({ publicacion }) => {
    return (
      <div className="bg-white rounded p-4 my-4 flex flex-col">
        <img
          src={publicacion.imagen}
          alt={publicacion.titulo}
          className="w-full shadow-sm h-auto mb-4 rounded-lg"
        />

        <div className="flex flex-col">
          <p className="mb-4">{publicacion.descripcion}</p>
          <div className="flex justify-center items-baseline gap-5">
            <FontAwesomeIcon icon={faCalendar} className="text-blue-600 ml-2" />
            <h1 className="text-xl mt-6 mb-4">{publicacion.primeraFecha}</h1>
            <h1 className="text-xl mt-6 mb-4">{publicacion.ultimaFecha}</h1>
          </div>
          <h3 className="text-lg font-bold mb-2">Vuelos:</h3>


          {publicacion.vuelos?.map((vuelo) => (

            <a
              href={vuelo.url}
              target="_blank"
              rel="noopener noreferrer"
              key={vuelo.id}
              className="border p-2 my-2 flex items-center justify-between hover:bg-gray-100 rounded-lg"
            >
              <div>
                <h4 className="text-lg font-bold mb-1">{vuelo.descripcion}</h4>
                <h4 className="text-lg font-bold">${vuelo.precio}</h4>
              </div>
              <FontAwesomeIcon icon={faExternalLinkAlt} className="text-blue-600 ml-2" />
            </a>
          ))}
        </div>

        <div className="text-sm bg-yellow-100 p-4 rounded-lg mt-4">
          <p>
            <strong>Aviso Legal:</strong> Upnomada no es una agencia de viajes, sino una plataforma que busca vuelos y que te permite acceder directamente a las mejores ofertas. Nuestra plataforma solo te brinda la posibilidad de disfrutar de precios baratos al ofrecerte enlaces directos a la compra de vuelos. ¡Empieza a explorar el mundo y ahorra con Upnomada!
          </p>
          <p className="mt-2">
            <strong>AVISO IMPORTANTE:</strong> Ten en cuenta la fecha de publicación de las ofertas de vuelo en Upnomada, ya que los precios pueden cambiar con el tiempo. Para asegurarte de disfrutar de las mejores ofertas, te recomendamos estar atento y acceder a los enlaces lo más pronto posible. ¡No dejes pasar la oportunidad de volar al mejor precio con Upnomada!
          </p>
        </div>
      </div>
    );
  };



  return (
    <div className="flex flex-col items-center">
      <CompProductDisplay isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <h1 className="text-3xl font-bold mt-6 mb-4">{publicacion.titulo}</h1>
      <div className="flex">

      </div>

      <div className="max-w-2xl">
        <Publicacion key={publicacion.id} publicacion={publicacion} />
      </div>
    </div>
  );
}
export default CompShowDetallesPublicacion;
