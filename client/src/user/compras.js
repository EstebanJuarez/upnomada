import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate , Link} from "react-router-dom";



const CompMisCompras = () => {
    const navigate = useNavigate()

    const [pedidos, setPedidos] = useState([]);
    const token = localStorage.getItem("token") || localStorage.getItem("guest-token");

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
        getPedidos()
    }, []);


    const URI = 'http://localhost:5000/compras'


    const getPedidos = async () => {

        try {
            const res = await axios.get(URI, {
                headers: {
                    "x-auth-token": token
                }
            });
            setPedidos(res.data.pedidos);
            console.log(pedidos);
        } catch (error) {
            console.log(error);
        }
    }

    return (



        <div>
            <br></br>
            <br></br>
            <br></br>
            <table className="table-mis-compras">

                <caption>Pedidos de compra</caption>
                <thead>
                    <tr>
                        <th scope="col">Estado</th>
                        <th scope="col">Total</th>
                        <th scope="col">Froma de pago</th>
                        <th scope="col">Fecha</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                        <tr key={pedido.id}>
                            <td>{pedido.estado}</td>
                            <td>${pedido.total}</td>
                            <td>{pedido.detalles_pago}</td>
                            <td>{pedido.createdAt}</td>
                            <td>
                                <Link to={`/compra/${pedido.id}`}> Ver  </Link>  <br />
                            </td>
                        </tr>
                    ))}
                   
                </tbody>
            </table>
        </div>

    );
};

export default CompMisCompras;
