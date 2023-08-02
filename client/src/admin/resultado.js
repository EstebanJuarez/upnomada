
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, } from "react-router-dom";
import Select from 'react-select'
import axios from "axios";
import { useParams } from 'react-router-dom';


const CompResultado = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [data, setData] = useState({});
    const { origen, destino } = useParams();

    const origenId = searchParams.get('origenId');
    const date = searchParams.get('date');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const body = { origen: origen, destino: destino };
                const res = await axios.post("http://localhost:5000/flights/searchEverywhereDetails", body);
                console.log(res.data);
                setData(res.data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    return (

        <div>
            <div className="m-5 p-4 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-4xl text-center ">Elige una ciudad</h1>
            </div>
            {data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
                    {data.map((resultado, index) => (
                        <div key={index} className="border p-4 rounded shadow-md ">

                                <div className="flex justify-between">
                                    <span className="font-bold text-lg">{resultado.Title}</span>
                                    <div>
                                        <span>Vuelos desde </span>
                                        <span className="font-bold">${resultado.Meta.Generic.Price} </span>
                                    </div>

                                </div>
                                <Link className="block mt-4" to={`/admin/vuelo/${origen}/${resultado.Quote.DestinationPlaceId}?title=${resultado.Title}&origenId=${origenId}&date=${date}`}>
                                    <img
                                        className="w-full rounded" src={resultado.ImageUrl} />
                                </Link>
                        </div>

                    ))}
                </div>
            ) : (
                <p>No hay frutas disponibles.</p>
            )}
        </div>
    );
};


export default CompResultado