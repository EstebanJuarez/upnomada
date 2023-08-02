
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';


const CompResultados = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [data, setData] = useState({});

    const origenId = searchParams.get('origenId');
    const date = searchParams.get('date');
    const { origen } = useParams();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await axios.post("http://localhost:5000/flights/searchEverywhere", { origen: origen });
                console.log(res);
                setData(res.data)
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);

                alert("Hubo un error")

            }

        };
        fetchData()
    }, [origen, origenId]);


    return (
        <div >
            <div className="m-5 p-4 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-4xl text-center ">Elige un destino</h1>
            </div>


            {loading ? (
                <p>Cargando...</p>
            ) : data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
                    {data.map((resultado, index) => (
                        <div key={index} className="border p-4 rounded shadow-md ">
                            <div className="flex justify-between">
                                <span className="font-bold text-lg">{resultado.Meta.CountryNameEnglish}</span>
                                <div>
                                    <span> Vuelos desde</span>
                                    <span className="font-bold"> ${resultado.Meta.Price}</span>
                                </div>
                            </div>
                            <Link
                                to={`/admin/vuelos/${origen}/${resultado.Meta.CountryId}?id=${resultado.Meta.CountryDDBID}&destinoName=${resultado.Payload.CountryName}&origenId=${origenId}&date=${date}`}
                                className="block mt-4"
                            >
                                <img src={resultado.Payload.ImageUrl} alt={resultado.Meta.CountryNameEnglish} className="w-full rounded" />
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


export default CompResultados