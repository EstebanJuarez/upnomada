import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:5000/compras/';

function CompShowCompra() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token") || localStorage.getItem("guest-token");
    const { id } = useParams()
    const [pedido, setPedidos] = useState([])
    const [nombre, setNombre] = useState([])
    const [apellido, setApellido] = useState([])
    const [estado, setEstado] = useState([])

    const getCompra = async () => {
        const res = await axios.get(URI + id, {
            headers: {
                "x-auth-token": token
            }
        },)
        setNombre(res.data[0].usuario.nombre_user)
        setApellido(res.data[0].usuario.apellido_user)
        setPedidos(res.data[0])
        setEstado(res.data[0].estado)
    }





    useEffect(() => {

        if (!token) {
            navigate("/login")
        } else {
            getCompra()


        }
    }, [])
    console.log(pedido);

    return (
        <div className="compra-edit">
            <h1 className="compra-title">Pedido</h1>
            <form className="compra-form-add-prod">
                <label className="compra-form-add-prod__label" htmlFor="compra-fecha">Fecha:</label>
                <input type="text" className="compra-form-add-prod__input" readOnly name="compra-fecha" id="compra-fecha" value={pedido.createdAt} required />

                <label className="compra-form-add-prod__label" htmlFor="compra-nombre">Nombre:</label>
                <input type="text" className="compra-form-add-prod__input" readOnly name="compra-nombre" id="compra-nombre" value={nombre} required />


                <label className="compra-form-add-prod__label" htmlFor="compra-apellido">Apellido:</label>
                <input type="text" className="compra-form-add-prod__input" readOnly name="compra-apellido" id="compra-apellido" value={apellido} required />

                <label className="compra-form-add-prod__label" htmlFor="compra-direccion">Direccion:</label>
                <input type="text" className="compra-form-add-prod__input" readOnly name="compra-direccion" id="compra-direccion" value={pedido.direccion} required />


                <label className="compra-form-add-prod__label" htmlFor="compra-detalles">Detalles de pago:</label>
                <input type="text" className="compra-form-add-prod__input" readOnly name="compra-detalles" id="compra-detalles" value={pedido.detalles_pago} required />

                <label className="compra-form-add-prod__label" htmlFor="compra-total"> Total</label>
                <input type="text" className="compra-form-add-prod__input" readOnly name="compra-total" id="compra-total" value={'$' + pedido.total} required />

                <label className="compra-form-add-prod__label" htmlFor="compra-estado">Estado: </label>
                <input type="text" className="compra-form-add-prod__input" readOnly name="compra-estado" id="compra-estado" value={pedido.estado} required />
                <h1 className="compra-title">Productos</h1>
                <table className="compra-list-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedido && pedido.detalles && pedido.detalles.map((detalle) => (
                            <tr key={detalle.id}>
                                <td>{detalle.Producto.descripcion}</td>
                                <td>{detalle.cantidad}</td>
                                <td>${detalle.precio}</td>
                                <td>${detalle.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>


    );
}

export default CompShowCompra;
