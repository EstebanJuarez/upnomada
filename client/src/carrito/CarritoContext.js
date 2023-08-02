import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = (props) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, imagen) => {
    const { id, descripcion, url, segments } = producto;
    const precio = producto.price;
    const segmentInfo = segments.map((segment) => ({
      origen: segment.origin.name,
      destino: segment.destination.name,
      arrival: segment.arrival,
      departure: segment.departure,
    }));

    const productoEnCarrito = carrito.find((p) => p.url === url);
    if (productoEnCarrito) {
      console.log('El producto ya está en el carrito');
    } else {
      const updatedCarrito = [
        ...carrito,
        {
          id,
          descripcion,
          url,
          precio,
          cantidad: 1,
          imagen,
          segments: segmentInfo,
        },
      ];
      setCarrito(updatedCarrito);
      localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
    }
  };

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter(
      (producto) => producto.id !== id
    );
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const calcularTotal = () => {
    const total = carrito.reduce((acumulador, producto) => {
      if (producto.descuento) {
        // Si hay descuento, calcular el subtotal tomando en cuenta el precio con descuento
        const subtotal = producto.descuento * producto.cantidad;
        return acumulador + subtotal;
      } else {
        // Si no hay descuento, calcular el subtotal utilizando el precio normal
        const subtotal = producto.precio * producto.cantidad;
        return acumulador + subtotal;
      }
    }, 0);

    return total.toFixed(2);
  };

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    console.log("get del segundo" + localStorage.getItem("carrito"));
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        calcularTotal,
        setCarrito,
      }}
    >
      {props.children}
    </CarritoContext.Provider>
  );
};
