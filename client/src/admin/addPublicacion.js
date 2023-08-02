import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function CompAddPublicacion() {
    const [titulo, setTitulo] = useState("");
    const [imagen, setImagen] = useState("");
    const [publicacion, setPublicacion] = useState([]);
    const [total, setTotal] = useState("");

    const [vueloOrigen, setVueloOrigen] = useState("");
    const [vueloDestino, setVueloDestino] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo(0, 200);
    };

    const crearPublicacion = async () => {
        if (publicacion.length <= 0 && titulo && imagen) {
            alert("Carrito vacío o cantidad inválida");
        } else {
            const url = "http://localhost:5000/publicaciones";
            const data = {
                total,
                carrito: publicacion,
                titulo,
                imagen,
            };
            try {
                const response = await axios.post(url, data);

                console.log(response.data);
                alert("Publicación creada con éxito");
            } catch (error) {
                console.error("Error al crear la publicación:", error);
                alert("Error al crear la publicación. Inténtalo de nuevo más tarde.");
            }
        }
    };

    const handleTituloChange = (event) => {
        setTitulo(event.target.value);
    };

    const handleImagenChange = (event) => {
        setImagen(event.target.value);
    };

    const handleVueloOrigenChange = (event) => {
        setVueloOrigen(event.target.value);
    };

    const handleVueloDestinoChange = (event) => {
        setVueloDestino(event.target.value);
    };

    const handleFechaInicioChange = (event) => {
        setFechaInicio(event.target.value);
    };

    const handleFechaFinChange = (event) => {
        setFechaFin(event.target.value);
    };

    const agregarVuelo = () => {
        const nuevoVuelo = {
            origen: vueloOrigen,
            destino: vueloDestino,
            fechaInicio,
            fechaFin,
        };

        setPublicacion([...publicacion, nuevoVuelo]);

        // Reiniciar los campos para el próximo vuelo
        setVueloOrigen("");
        setVueloDestino("");
        setFechaInicio("");
        setFechaFin("");
    };

    return (
        <div className="container mx-auto px-4 mt-10">
            <h1 className="text-4xl font-bold mb-6">Trip</h1>
            <label htmlFor="titulo" className="flex flex-col">
                Titulo
                <input
                    className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="titulo"
                    value={titulo}
                    onChange={handleTituloChange}
                />
            </label>

            <label htmlFor="imagen" className="flex flex-col">
                Imagen
                <input
                    className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="imagen"
                    value={imagen}
                    onChange={handleImagenChange}
                />
            </label>

            <label htmlFor="fechaInicio" className="flex flex-col">
                Fecha de Inicio
                <input
                    type="date"
                    className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="fechaInicio"
                    value={fechaInicio}
                    onChange={handleFechaInicioChange}
                />
            </label>
            <label htmlFor="fechaFin" className="flex flex-col">
                Fecha de Fin
                <input
                    type="date"
                    className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="fechaFin"
                    value={fechaFin}
                    onChange={handleFechaFinChange}
                />
            </label>
            {/* Formulario para ingresar los detalles de cada vuelo */}
            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Agregar Vuelo</h2>
                <label htmlFor="vueloOrigen" className="flex flex-col">
                    Origen
                    <input
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="vueloOrigen"
                        value={vueloOrigen}
                        onChange={handleVueloOrigenChange}
                    />
                </label>
                <label htmlFor="vueloDestino" className="flex flex-col">
                    Destino
                    <input
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="vueloDestino"
                        value={vueloDestino}
                        onChange={handleVueloDestinoChange}
                    />
                </label>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    onClick={agregarVuelo}
                >
                    Agregar Vuelo
                </button>
            </div>

            {/* Mostrar la lista de vuelos agregados */}
            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Vuelos Agregados</h2>
                {publicacion.map((vuelo, index) => (
                    <div key={index} className="border rounded-md p-4 mb-4">
                        <p>Origen: {vuelo.origen}</p>
                        <p>Destino: {vuelo.destino}</p>
                        <p>Fecha de Inicio: {vuelo.fechaInicio}</p>
                        <p>Fecha de Fin: {vuelo.fechaFin}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={crearPublicacion}
                >
                    Crear Publicación
                </button>
            </div>
        </div>
    );
}

export default CompAddPublicacion;
