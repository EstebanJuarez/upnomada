import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Importa los iconos que necesitas

import CompProductDisplay from "../payment/productDisplay";
function CompShowAllPublicaciones() {
  const [offset, setOffset] = useState(0);
  const limit = 9; // Número de resultados por página
  const [totalPages, setTotalPages] = useState(0); // Estado para el número total de páginas
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual

  const [publicaciones, setPublicaciones] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldModalOpen, setShouldModalOpen] = useState(false);

  const token = localStorage.getItem("token")
  const obtenerPublicaciones = async () => {
    try {
      const response = await axios.get("http://localhost:5000/publicaciones/allPublicaciones", {
        headers: {
          'x-auth-token': token,
        },
        params: {
          offset,
          limit,
        },
      });
      const data = response.data.publicaciones;
      setPublicaciones(data);
      const totalCount = response.data.totalCount; // Asegúrate de enviar el total de publicaciones desde el servidor
      setTotalPages(Math.ceil(totalCount / 9));
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      setShouldModalOpen(true);
    }
    obtenerPublicaciones();
  }, [offset]);

  const [hoveredOffer, setHoveredOffer] = useState(null);
  const handleOfferHover = (index) => {
    setHoveredOffer(index);
  };

  const handleOfferLeave = () => {
    setHoveredOffer(null);
  };


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newOffset = currentPage * limit;
      setCurrentPage(currentPage + 1);
      setOffset(offset + limit)
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newOffset = (currentPage - 2) * limit;
      setCurrentPage(currentPage - 1);
      setOffset(offset - limit)
    }
  };
  return (
    <>


      <div className="p-16 flex flex-col items-center">
        <div className="py-20">
          <h1 className="text-5xl text-center text-bleu mb-10">Explora todas nuestras ofertas</h1>
        </div>
        <CompProductDisplay isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
          {publicaciones.map((publicacion, index) => (
            <Link
              to={shouldModalOpen ? "#" : "/publicacion/" + publicacion.id} // Si shouldModalOpen es true, no redirige a ninguna URL
              key={`page-${offset / limit}-${publicacion.id}`}
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
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            className="mr-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Anterior
          </button>
          <button
            onClick={handleNextPage}
            className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Siguiente <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>

      </div>
    </>
  );
};

export default CompShowAllPublicaciones;
