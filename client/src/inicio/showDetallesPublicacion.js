import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";

function CompShowDetallesPublicacion() {
  const [publicacion, setPublicacion] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    // Función asincrónica para obtener las publicaciones con sus vuelos y segmentos asociados
    const obtenerPublicacion = async () => {
      try {
        const response = await axios.get("http://localhost:5000/publicaciones/" + id);
        const data = response.data.publicacion;
        setPublicacion(data);
        console.log(data.vuelos);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
      }
    };

    obtenerPublicacion();
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mt-6 mb-4">Publicaciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        <div key={publicacion.id} className="bg-white rounded shadow-lg p-4 my-4">
          <h2 className="text-xl font-bold mb-2">{publicacion.descripcion}</h2>
          <img
            src={publicacion.imagen}
            alt={publicacion.descripcion}
            className="w-32 h-32 object-cover rounded"
          />

          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Vuelos:</h3>
            {publicacion.vuelos?.map((vuelo) => (
              <div key={vuelo.id} className="border p-2 my-2">
                <h4 className="text-lg font-bold mb-2">{vuelo.descripcion}</h4>
                <h4 className="text-lg font-bold mb-2">${vuelo.precio}</h4>
                {vuelo.segmentos.map((segmento) => (
                  <div key={segmento.id} className="p-2 my-2">

                    <p>Origen: {segmento.origen}</p>
                    <p>Destino: {segmento.destino}</p>
                    <p>Arrival: {segmento.arrival}</p>
                    <p>Departure: {segmento.departure}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CompShowDetallesPublicacion;
