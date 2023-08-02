import React, { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function CompAddCarrito({ props, imagen }) {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);


  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(props, imagen);
    setMostrarAlerta(true);
    setTimeout(() => {
      setMostrarAlerta(false);
    }, 1000);
  };

  return (
    <div className="carrito-btn">
      <button className="border-gray-300 border px-4 py-2 rounded mt-4 block text-center text-blue-500 hover:bg-blue-500 hover:text-white"
        onClick={handleAgregarAlCarrito}>Añadir <FontAwesomeIcon icon={faPlus} /></button>
      {mostrarAlerta && (
        <div className="alerta">Vuelo agregado</div>
      )}
    </div>
  );
}

export default CompAddCarrito;
