
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { format, startOfDay } from 'date-fns';
import Calendar from 'react-calendar';
import CompVuelo from "./vuelo";
const CompCalendar = ({ onDateChange }) => {


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [data, setData] = useState({});
    const { origen, destino } = useParams();

    const origenId = searchParams.get('origenId');
    const date = searchParams.get('date');
    const [selectedDate, setSelectedDate] = useState(date);

    useEffect(() => {
        // Creamos una función de cancelación usando una fuente de cancelación
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                const body = { origen: origen, destino: destino, date: date };
                const res = await axios.post("http://localhost:5000/flights/getPriceCalendar", body, {
                    cancelToken: source.token // Asignamos la fuente de cancelación a la solicitud
                });
                setData(res.data.data.flights.days);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        // Limpieza del useEffect para cancelar la solicitud si el componente se desmonta antes de que finalice
        return () => {
            source.cancel('Request canceled by user.'); // Cancelamos la solicitud con un mensaje opcional
        };
    }, [selectedDate, origen, destino]);



    // Función para mostrar el calendario con colores para cada fecha según su grupo
    const tileContent = ({ date }) => {
        const dateStr = date.toISOString().split('T')[0];
        const dateData = data.find((item) => item.day === dateStr);

        if (dateData) {
            const groupClass = dateData.group; // Asignamos la clase directamente con el grupo

            return (
                <div
                    className={`tile ${groupClass}`}

                >
                    ${dateData.price.toFixed(2)}
                </div>
            );
        }

        return null;
    };
    console.log(selectedDate);

    const getTileClass = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        const dateData = data.find((item) => item.day === dateStr);

        if (dateData) {
            return dateData.group; // Devolvemos el grupo como clase del tile
        }

        return '';
    };
    const handleDateChange = (date) => {
        // Formatear la fecha en el formato deseado (YYYY-MM-DD)
        const formattedDate = format(date, 'yyyy-MM-dd');
        setSelectedDate(formattedDate); // Actualizar selectedDate en CompCalendar

        onDateChange(formattedDate);
    };

    const isSelectedDate = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        return formattedDate === selectedDate;
    };
    const currentDate = startOfDay(new Date()); // Obtenemos la fecha actual con el primer momento del día


    return (
        <div className="flex flex-col align-middle justify-center items-center">
            <h2>Calendario de precios:</h2>
            {data.length > 0 ? (
                <Calendar
                    value={selectedDate}
                    tileClassName={({ date }) =>
                        `${getTileClass(date)} ${isSelectedDate(date) ? 'selected' : ''}`
                    } // Asignamos la clase del grupo y la clase "selected" si es la fecha seleccionada
                    tileContent={tileContent}
                    minDate={currentDate} // Establecemos la fecha mínima como la fecha actual

                    onChange={handleDateChange} // Usamos la función handleDateChange
                />
            ) : (
                <p>No hay fechas disponibles.</p>
            )}
        </div>
    );
};
export default CompCalendar