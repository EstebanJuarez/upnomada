import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { de } from "date-fns/locale";

function CompAdminShowPublicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);
    const token = localStorage.getItem("token");


    const obtenerPublicaciones = async () => {
        try {
            const response = await axios.get("http://localhost:5000/publicaciones/all", {
                headers: {
                    'x-auth-token': token,
                }
            });
            const data = response.data.publicaciones;
            setPublicaciones(data);
            console.log(data);
        } catch (error) {
            console.error("Error al obtener las publicaciones:", error);
        }
    };
    useEffect(() => {
        if (token) {

            obtenerPublicaciones();
        }
    }, []);

    const deletePublicacion = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            try {
                await axios.delete("http://localhost:5000/publicaciones/" + id, {
                    headers: {
                        "x-auth-token": token
                    }
                });
                obtenerPublicaciones()
            } catch (error) {
                alert("Hubo un error al eliminar la publicación")
                console.error(error);

            }
        }
    }


    return (
        <div className="flex flex-col   p-16 mt-10 ml-56   shadow-inner bg-[#f8f9ff] max-w-8xl  ">
            <h1 className="text-4xl font-bold mb-6 text-center">Publicaciones</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {publicaciones.map((publicacion) => (
                    <div key={publicacion.id} className="border p-4">
                        <img src={publicacion.imagen} alt={publicacion.titulo} className="w-full h-40 object-cover mb-4" />
                        <h2 className="text-xl font-bold mb-2">{publicacion.titulo}</h2>
                        <p className="text-gray-600">{publicacion.descripcion}</p>
                        <p className="text-blue-600 text-sm mt-2">Precio: ${publicacion.precio}</p>
                        <div className="flex mt-4 gap-0 sm:gap-5">
                            <Link to={ `${publicacion.id}`} className="bg-blue-500 text-white py-2 px-4 rounded">Editar</Link>
                            <button onClick={() => { deletePublicacion(publicacion.id) }} className="bg-red-500 text-white py-2 px-4 rounded mr-2" >Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CompAdminShowPublicaciones;
