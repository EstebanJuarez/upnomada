import React, { useContext } from "react";
import { CarritoContext } from "./CarritoContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function BtnCarrito() {
    const { carrito } = useContext(CarritoContext);

    return (
        <div>
            <Link to={'/admin/carrito'} className="link-carrito-btn">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>{carrito.length}</span>
            </Link>
        </div>
    );
}

export default BtnCarrito;
