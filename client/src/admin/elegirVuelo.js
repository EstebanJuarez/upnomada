
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';
import CompAddCarrito from "../carrito/addAlCarrito";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { format, isValid, parse } from 'date-fns';

const CompElegirVuelo = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { origen, destino } = useParams();
  const origenId = searchParams.get('origenId');
  const date = searchParams.get('date');
  const id = searchParams.get('id');
  const sessionId = searchParams.get('sessionId');
  const destinoId = searchParams.get('destinoId');
  const dateArrival = searchParams.get('dateArrival');


  const [data, setData] = useState([]);
  const [imagen, setImagen] = useState([]);

  const [loading, setLoading] = useState(true);
  const [dateArrivalFormated, setDateArrivalFormated] = useState(true);




  useEffect(() => {
    setDateArrivalFormated(dateArrival.split('T')[0])

    const fetchData = async () => {
      try {
        const body = {
          origen: origen,
          destino: destino,
          origenId: origenId,
          date: date,
          id: id,
          sessionId: sessionId
        };

        const res = await axios.post("http://localhost:5000/flights/getFlightDetails", body);
        const responseData = res.data.data;

        console.log(responseData);
        if (!responseData) {
          console.error('No se encontraron datos en la respuesta.');
          setLoading(false);
          return;
        }

        // Verificar si la propiedad 'itinerary' existe y no es null antes de acceder a 'destinationImage'
        if (responseData.itinerary !== null && typeof responseData.itinerary === 'object' && responseData.itinerary.destinationImage) {
          setImagen(responseData.itinerary.destinationImage);
        } else {
          console.error('No se encontró la imagen del destino en la respuesta.');
          setImagen('imagen_predeterminada.jpg');
        }

        setData(responseData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [origen, destino, origenId, date, id]);


  const generarEstrellas = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const remainingStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
        {[...Array(remainingStars)].map((_, index) => (
          <FontAwesomeIcon key={index + fullStars} icon={faStar} className=" text-gray-20" />
        ))}
      </div>
    );
  };

  console.log(data);
  return (
    <div className="mt-10">
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <div>
          <div className="flex items-center justify-center">
            {imagen && (
              <img
                className="object-cover max-w-80 max-h-80"
                src={imagen}
                alt="Imagen del destino"
              />
            )}
          </div>
          {data !== null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
              {Object.entries(data).map(([resultadoKey, resultadoValue], index) => (
                Array.isArray(resultadoValue.pricingOptions) &&
                resultadoValue.pricingOptions.map((option, i) => (
                  <div key={i} className="border border-gray-300 rounded p-4 flex flex-col justify-between">
                    <div>
                      <span className="block text-2xl font-bold mb-2">${option.totalPrice}</span>
                      {Array.isArray(option.agents) &&
                        option.agents.map((agent, j) => (
                          <div key={j} className="flex items-center mb-2">
                            {generarEstrellas(agent.rating.value)}
                            <Link
                              to={agent.url}
                              className="text-blue-500 underline ml-2"
                            >
                              {agent.name}
                            </Link>
                          </div>
                        ))}
                    </div>
                    <CompAddCarrito props={option.agents[0]} imagen={imagen} />
                  </div>
                ))
              ))}
            </div>
          ) : (
            <p>Los datos no son válidos.</p>
          )}
          <Link
            className="border-gray-300 border px-4 py-2 rounded mt-4 block mx-auto text-center text-blue-500 hover:bg-blue-500 hover:text-white"
            to={'/admin/vuelos-desde/' + destino + "?origenId=" + destinoId + "&date=" + dateArrivalFormated}
          >
            Añadir más vuelos
          </Link>
        </div>
      )}
    </div>
  );
};


export default CompElegirVuelo