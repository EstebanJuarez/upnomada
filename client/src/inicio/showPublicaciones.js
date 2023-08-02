import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate, } from "react-router-dom";

function CompShowPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);


  useEffect(() => {
    // Función asincrónica para obtener las publicaciones con sus vuelos y segmentos asociados
    const obtenerPublicaciones = async () => {
      try {
        const response = await axios.get("http://localhost:5000/publicaciones");
        const data = response.data.publicaciones;
        setPublicaciones(data);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
      }
    };

    obtenerPublicaciones();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-5xl text-center mb-40">Explora nuestras ofertas</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {publicaciones.map((publicacion, index) => (
          <Link
            className=""
            to={"/publicacion/" + publicacion.id}
          >
            <div
              key={publicacion.id}
              className="bg-white rounded shadow-lg my-4 transition duration-300 transform hover:scale-105"
            >
              <img
                src={publicacion.imagen}
                alt={publicacion.descripcion}
                className="w-50 h-50 object-cover rounded"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{publicacion.descripcion}</h2>
                <span className="text-lg font-bold">${publicacion.precio}</span>
                <br />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompShowPublicaciones;
