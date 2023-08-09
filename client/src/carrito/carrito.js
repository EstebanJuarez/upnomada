import React, { useContext, useEffect, useState } from "react";
import { CarritoContext } from "./CarritoContext.js";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Carrito() {

    const token = localStorage.getItem("token");
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");

    const { carrito, eliminarDelCarrito, vaciarCarrito, calcularTotal, setCarrito } =
        useContext(CarritoContext);


    const [primeraFecha, setPrimeraFecha] = useState('');

    // Estado para la última fecha
    const [ultimaFecha, setUltimaFecha] = useState('');

    // Obtener las fechas del primer vuelo del primer segmento
    const primerSegmento = carrito[0]?.segments[0];
    const primeraFechaSegmento = primerSegmento?.departure.split('T')[0];

    // Obtener las fechas del último vuelo del último segmento
    const ultimoVuelo = carrito[carrito.length - 1]?.segments;
    const ultimoSegmento = ultimoVuelo?.[ultimoVuelo.length - 1];
    const ultimaFechaSegmento = ultimoSegmento?.arrival.split('T')[0];

    // Función para actualizar los estados de las fechas
    const actualizarFechas = () => {
        setPrimeraFecha(primeraFechaSegmento);
        setUltimaFecha(ultimaFechaSegmento);
    };
    const navigate = useNavigate();

    const handleEliminarDelCarrito = (id, talleSeleccionadoId) => {
        eliminarDelCarrito(id, talleSeleccionadoId);
    };

    const handleVaciarCarrito = () => {
        vaciarCarrito();
    };

    const scrollToTop = () => {
        window.scrollTo(0, 200);
    };

    console.log(carrito);
    const crearPublicacion = async () => {
        if (carrito.length <= 0 && titulo && imagen) {
            alert("Carrito vacío o cantidad inválida");
        } else {
            const url = 'http://localhost:5000/publicaciones';
            const data = {
                total: calcularTotal(),
                carrito: carrito,
                titulo,
                imagen,
                descripcion,
                primeraFecha,
                ultimaFecha,
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

    const handleImagenChange = (imagen) => {
        setImagen(imagen);

    };

    const handleDescripcion = (event) => {
        setDescripcion(event.target.value);
    };


    const handleVueloDescripcionChange = (id, nuevaDescripcion) => {
        const newCarrito = carrito.map((producto) =>
            producto.id === id ? { ...producto, vueloDescripcion: nuevaDescripcion } : producto
        );
        setCarrito(newCarrito);
        console.log(carrito);
    };


    useEffect(() => {
        actualizarFechas()
    }, [carrito.length, ultimaFechaSegmento]);

    const SegmentoVuelo = ({ segment }) => {
        const splitArrival = segment.arrival.split("T");
        const splitDeparture = segment.departure.split("T");

        const arrivalDate = splitArrival[0];
        const arrivalTime = splitArrival[1];

        const departureDate = splitDeparture[0];
        const departureTime = splitDeparture[1];

        return (
            <div className="border p-4 mb-4">
                <p>
                    <span className="font-bold">Origen:</span> {segment.origen}
                </p>
                <p>
                    <span className="font-bold">Destino:</span> {segment.destino}
                </p>
                <p>
                    <span className="font-bold">Salida:</span> {departureDate} - {departureTime}
                </p>
                <p>
                    <span className="font-bold">Llegada:</span> {arrivalDate} - {arrivalTime}
                </p>
            </div>
        );
    };



    return (
        <div className="flex flex-col  shadow-md p-16 mt-10 ml-56  bg-[#f8f9ff] max-w-8xl  ">
            <h1 className="text-4xl font-bold mb-6">Trip</h1>
            <p>Fecha de inicio del viaje: {primeraFecha}</p>
            <p>Fecha de fin del viaje: {ultimaFecha}</p>

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
                <input
                    className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="descripcion"
                    value={descripcion}
                    onChange={handleDescripcion}
                />
            </label>



            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-1">
                {carrito.map((producto) => (
                    <div key={producto.id} className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-2">
                            <div className="mb-4 flex flex-col items-center" >
                                <span className="font-bold">Descripción del vuelo:</span>
                                <textarea
                                    className="border rounded-md max-w-xs px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={producto.vueloDescripcion}
                                    onChange={(event) => handleVueloDescripcionChange(producto.id, event.target.value)}
                                />

                            </div>
                            <span className="font-bold">Recorrido:</span>

                            <span className="ml-2">
                                {producto.segments.map((segment) => segment.origen).join(" - ")}
                            </span>
                            <span className="mx-2">-</span>
                            <span>
                                {producto.segments.map((segment) => segment.destino).join(" - ")}
                            </span>
                        </div>
                        <div className="mb-4 flex flex-col items-center">
                            <Link to={producto.url} target="_blank">
                                <img
                                    src={producto.imagen}
                                    alt="Imagen del destino"
                                    className="w-32 h-32 object-cover mx-auto"
                                />
                            </Link>
                            <button onClick={() => handleImagenChange(producto.imagen)} className="text-sm px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >Seleccionar imagen</button>
                        </div>
                        <div>
                            <p className="font-bold mb-2">Precio: ${producto.precio}</p>
                            <div className="mb-4">
                                <span className="font-bold">Segmentos:</span>
                                {producto.segments.map((segment, index) => (
                                    <SegmentoVuelo key={index} segment={segment} />
                                ))}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleEliminarDelCarrito(producto.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {carrito.length > 0 && (
                <>
                    <p className="mt-6">Total: ${calcularTotal()}</p>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleVaciarCarrito}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Eliminar todos los vuelos
                        </button>
                        <button
                            onClick={crearPublicacion}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Crear publicación
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
export default Carrito;
