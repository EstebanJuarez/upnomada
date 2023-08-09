import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect } from "react";
import { set } from "date-fns";

function CompAddPublicacion() {
    const [titulo, setTitulo] = useState("");
    const [imagen, setImagen] = useState("");
    const [publicacion, setPublicacion] = useState([]);
    const [total, setTotal] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [vueloOrigen, setVueloOrigen] = useState("");
    const [vueloDescripcion, setVueloDescripcion] = useState("");
    const [vueloDestino, setVueloDestino] = useState("");
    const [vueloURL, setVueloURL] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");


    const scrollToTop = () => {
        window.scrollTo(0, 200);
    };


    const token = localStorage.getItem("token");

    const crearPublicacion = async () => {
        if (publicacion.length <= 0 || !titulo || !imagen) {
            alert("Publicacion invalida, comprueba los campos ");
        } else {
            const url = "http://localhost:5000/publicaciones/custom";
            const data = {
                total: calcularTotal(),
                carrito: publicacion,
                titulo,
                descripcion,
                imagen,
                primeraFecha: fechaInicio,
                ultimaFecha: fechaFin,
            };
            try {
                const response = await axios.post(url, data, {
                    headers: {
                      'x-auth-token': token,
                    },
                  });
                  
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

    const handleVueloDescripcionChange = (event) => {
        setVueloDescripcion(event.target.value);
    };


    const handleVueloDestinoChange = (event) => {
        setVueloDestino(event.target.value);
    };

    const handleVueloURLChange = (event) => {
        setVueloURL(event.target.value);
    };

    const handleFechaInicioChange = (event) => {
        setFechaInicio(event.target.value);
    };

    const handleFechaFinChange = (event) => {
        setFechaFin(event.target.value);
    };

    const handleTotalChange = (event) => {
        setTotal(event.target.value);
    };

    const handlePrecioChange = (event) => {
        setPrecio(event.target.value);
    };

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };

    //FIXME: Añadir el descripcion de cada vuelo 

    const agregarVuelo = () => {
        if (vueloDescripcion && vueloURL) {
            const nuevoVuelo = {
                descripcion: descripcion,
                url: vueloURL,
                precio: precio
            };

            setPublicacion([...publicacion, nuevoVuelo]);

            // Reiniciar los campos para el próximo vuelo
            setVueloOrigen("");
            setVueloDestino("");
            setVueloDescripcion("");
            setDescripcion("");
            setVueloURL("")
            setPrecio("")
        }
        else {
            alert("Completa los campos origen, destino y url")
        }

    };

    const borrarVuelo = (index) => {
        const nuevaPublicacion = [...publicacion];
        nuevaPublicacion.splice(index, 1);
        setPublicacion(nuevaPublicacion);
    };

    const calcularTotal = () => {
        return publicacion.reduce((total, vuelo) => parseFloat(total) + parseFloat(vuelo.precio), 0);

    };

    return (
        <div className="flex flex-col  shadow-md p-16 mt-10 ml-56  bg-[#f8f9ff] max-w-8xl  ">
            <h1 className="text-4xl font-bold mb-6 text-center">Nueva publicación</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-10">
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



                <label htmlFor="descripcion" className="flex flex-col">
                    Descripción
                    <textarea
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="descripcion"
                        value={descripcion}
                        onChange={handleDescripcionChange}
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
                        onChange={handleTotalChange}
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
            </div>

            {/* Formulario para ingresar los detalles de cada vuelo */}
            <div className="mt-10 ">
                <h2 className="text-lg font-bold mb-10">Agregar Vuelo</h2>
                <label htmlFor="vueloDescripcion" className="flex flex-col">
                    Descripcion
                    <input
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="vueloDescripcion"
                        value={vueloDescripcion}
                        onChange={handleVueloDescripcionChange}
                    />
                </label>

                <label htmlFor="vueloURL" className="flex flex-col">
                    URL
                    <input
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="vueloURL"
                        value={vueloURL}
                        onChange={handleVueloURLChange}
                    />
                </label>

                <label htmlFor="vueloPrecio" className="flex flex-col">
                    Precio
                    <input
                        className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="vueloPrecio"
                        type="number"
                        value={precio}
                        onChange={handlePrecioChange}
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
            <h2 className=" mt-6  text-lg font-bold mb-2">Vuelos Agregados</h2>
            <div className="mt-6  grid grid-cols-1 md:grid-cols-3">
                {publicacion.map((vuelo, index) => (
                    <div key={index} className="border rounded-md p-4 mb-4">
                        <p>Descripcion: {vuelo.descripcion}</p>
                        <p>URL: {vuelo.url}</p>
                        <p>Precio: ${vuelo.precio}</p>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                            onClick={() => borrarVuelo(index)}
                        >
                            Borrar Vuelo
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded float-right"
                    onClick={crearPublicacion}
                >
                    Crear Publicación
                </button>
            </div>
        </div>
    );
}

export default CompAddPublicacion;
