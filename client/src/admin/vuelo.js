
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, } from "react-router-dom";
import Select from 'react-select'
import axios from "axios";
import { format } from 'date-fns';

import { useParams } from 'react-router-dom';
import CompCalendar from "./calendar";
const CompVuelo = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { origen, destino } = useParams();
  const origenId = searchParams.get('origenId');
  const title = searchParams.get('title');
  const date = searchParams.get('date');


  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(true);
  const [currentDateSelected, setCurrentDateSelected] = useState(" ");
  const [destinoId, setDestinoId] = useState(" ");
  const [selectedDate, setSelectedDate] = useState(new Date());

  console.log(currentDateSelected);
  const fetchDataWithDate = async (newDate) => {
    try {
      setLoading(true);
      const body = {
        origen: origen,
        destino: destino,
        origenId: origenId,
        title: title,
        date: newDate, // Usamos la nueva fecha seleccionada
      };
      const res = await axios.post("http://localhost:5000/flights", body);
      setSessionId(res.data.response.sessionId);
      setDestinoId(res.data.airport);
      setData(res.data.response.data.itineraries);
      setLoading(false);
      setCurrentDateSelected(newDate)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataWithDate(selectedDate);
  }, [origen, destino, origenId, title, selectedDate]);


  console.log(data);



  return (
    <div className="container mx-auto">
    <CompCalendar onDateChange={fetchDataWithDate} />

    {loading ? (
      <p>Cargando...</p>
    ) : (
      <div>
        {currentDateSelected && (
          <h1 className="text-xl font-bold my-4">Fecha seleccionada: {currentDateSelected}</h1>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((resultado, index) => (
              <div key={index} className="border p-4 rounded shadow-md">
                {resultado.legs.map((leg, i) => (
                  <div key={i} className="flex flex-col items-center mb-4 rounded">
                    <img className="w-12 mb-2" src={leg.carriers.marketing[0].logoUrl} alt="Airline logo" />
                    <span className="font-bold text-lg">{resultado.price.formatted}</span>
                    <span>{leg.origin.name} ➔ {leg.destination.name}</span>
                    <span>Salida: {leg.departure}</span>
                    <span>Llegada: {leg.arrival}</span>
                    <Link target="_blank" to={`/admin/elegir-vuelo/${leg.origin.id}/${leg.destination.id}?origenId=${origenId}&date=${currentDateSelected}&dateArrival=${leg.arrival}&sessionId=${sessionId}&id=${resultado.id}&destinoId=${destinoId}`} className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                      Ver detalles
                    </Link>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>Los datos no son válidos.</p>
          )}
        </div>
      </div>
    )}
  </div>
  );

};


export default CompVuelo