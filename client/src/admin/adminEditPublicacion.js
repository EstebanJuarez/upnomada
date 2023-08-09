import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CompAdminEditPublicacion() {
    const [publicacion, setPublicacion] = useState({});
    const [vuelos, setVuelos] = useState([]);
    const token = localStorage.getItem("token");

    const { id } = useParams();

    const obtenerPublicacion = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/publicaciones/admin/${id}`, {
                headers: {
                    'x-auth-token': token,
                }
            });

            const data = response.data.publicacion;
            console.log(data);
            setPublicacion(data);
            setVuelos(data.vuelos);
            console.log(data);
        } catch (error) {
            console.error("Error al obtener la publicación:", error);
        }
    };

    useEffect(() => {
        if (token) {
            obtenerPublicacion();
        }
    }, [token, id]); // Dependencias actualizadas para volver a cargar la publicación cuando el token o el id cambian

    const handleEdit = async () => {
        const data = {
            publicacion,
            vuelos
        }
        try {
            await axios.put(`http://localhost:5000/publicaciones/${id}`, data, {
                headers: {
                    'x-auth-token': token,
                }
            });
        } catch (error) {
            console.error("Error al editar la publicación:", error);
        }
    };


    const handleAddVuelo = () => {
        // Agregar un vuelo nuevo al estado de vuelos
        setVuelos([...vuelos, { descripcion: "", precio: 0, url: "" }]);
    };

    const handleRemoveVuelo = (index) => {
        // Eliminar un vuelo del estado de vuelos en función del índice
        const updatedVuelos = [...vuelos];
        updatedVuelos.splice(index, 1);
        setVuelos(updatedVuelos);
    };

    const handleEditVuelo = (index, field, value) => {
        // Modificar los detalles de un vuelo en función del índice y el campo
        const updatedVuelos = [...vuelos];
        updatedVuelos[index][field] = value;
        setVuelos(updatedVuelos);
    };


    const calcularTotal = () => {
        let total = 0;
        for (const vuelo of vuelos) {
            total += parseFloat(vuelo.precio);
        }
        return total.toFixed(2); // Redondear el total a 2 decimales
    };
    console.log(calcularTotal());
    return (
        <div className="flex flex-col p-16 mt-10 ml-56 shadow-inner bg-[#f8f9ff] max-w-8xl">
            <h1 className="text-4xl font-bold mb-6 text-center">Editar Publicación</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-10">

                <label htmlFor="titulo" className="flex flex-col">
                    Titulo
                    <input
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="titulo"
                        value={publicacion.titulo}
                        onChange={(e) => setPublicacion({ ...publicacion, titulo: e.target.value })}
                    />
                </label>


                <label htmlFor="imagen" className="flex flex-col">
                    Imagen
                    <input
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="imagen"
                        value={publicacion.imagen}
                        onChange={(e) => setPublicacion({ ...publicacion, imagen: e.target.value })}
                    />
                </label>


                <label htmlFor="descripcion" className="flex flex-col">
                    Descripción
                    <textarea
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="descripcion"
                        value={publicacion.descripcion}
                        onChange={(e) => setPublicacion({ ...publicacion, descripcion: e.target.value })}
                    />
                </label>

                <label htmlFor="total" className="flex flex-col">
                    Total
                    <input
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="total"
                        type="number"
                        disabled
                        value={calcularTotal()}
                        onChange={(e) => setPublicacion({ ...publicacion, precio: e.target.value })}
                    />
                </label>



                <label htmlFor="fechaInicio" className="flex flex-col">
                    Fecha de Inicio
                    <input
                        type="date"
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="fechaInicio"
                        value={publicacion.primeraFecha}
                        onChange={(e) => setPublicacion({ ...publicacion, primeraFecha: e.target.value })}
                    />
                </label>
                <label htmlFor="fechaFin" className="flex flex-col">
                    Fecha de Fin
                    <input
                        type="date"
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="fechaFin"
                        value={publicacion.ultimaFecha}
                        onChange={(e) => setPublicacion({ ...publicacion, ultimaFecha: e.target.value })}
                    />
                </label>



            </div>

            {vuelos.map((vuelo, vueloIndex) => (
                <div key={vueloIndex}>
                    <input
                        type="text"
                        placeholder="descripcion"
                        value={vuelo.descripcion}
                        onChange={(e) => handleEditVuelo(vueloIndex, "descripcion", e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="precio"
                        value={vuelo.precio}
                        onChange={(e) => handleEditVuelo(vueloIndex, "precio", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="url"
                        value={vuelo.url}
                        onChange={(e) => handleEditVuelo(vueloIndex, "url", e.target.value)}
                    />
                    <button onClick={() => handleRemoveVuelo(vueloIndex)}>Eliminar</button>
                </div>
            ))}
            <div>
                <button onClick={handleAddVuelo}>Agregar Vuelo</button>
                <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</button>
            </div>
        </div>
    );
}

export default CompAdminEditPublicacion;
