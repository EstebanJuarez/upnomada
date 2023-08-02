
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, } from "react-router-dom";
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import BtnCarrito from "../carrito/btnCarrito";
const CompBuscador = () => {
    const [selectedOriginOption, setSelectedOriginOption] = useState(null);
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedFormateddDate, setSelectedFormateddDate] = useState(null);
    const currentDate = new Date();

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = format(date, 'yyyy-MM-dd');
        setSelectedFormateddDate(formattedDate)

    };
    const location = useLocation();
    // Verificar si la ruta actual comienza con "/admin"
    const isAdminRoute = location.pathname.startsWith("/admin");


    const options = [
        {
            value: '39151418',
            label: 'Mexico City - CITY',
            skyId: 'MEXA',
            entityType: 'CITY',
        },
        {
            value: '95673321',
            label: 'Mexico City Juarez International - AIRPORT',
            skyId: 'MEX',
            entityType: 'AIRPORT',
        },
        {
            value: '129053801',
            label: 'Mexico City Santa Lucia - AIRPORT',
            skyId: 'NLU',
            entityType: 'AIRPORT',
        },
        {
            value: '29475432',
            label: 'Mexico - COUNTRY',
            skyId: 'MX',
            entityType: 'COUNTRY',
        },
        {
            value: '95673471',
            label: 'Tijuana - AIRPORT',
            skyId: 'TIJ',
            entityType: 'AIRPORT',
        },
    ];



    useEffect(() => {

    }, []);


    const handleSelectChange = (selectedOption) => {
        setSelectedOriginOption(selectedOption);
        // Puedes realizar acciones adicionales aquí utilizando el valor de selectedOption
        console.log(selectedOption);
    };



    return (
        <>
            <div>
                {isAdminRoute && (
                    <div className="flex items-center justify-center gap-5">
                        <div className="logo-container">
                            <h1 className="logo">Upnomada</h1>
                        </div>
                        <button className="border-gray-300 border px-1 py-1.5 rounded">Pasajeros</button>
                        <Select
                            options={options}
                            isSearchable
                            value={selectedOriginOption}
                            onChange={handleSelectChange}
                            placeholder="Select an option"
                        />
                        <DatePicker
                            className="border-gray-300 border px-1 py-1.5 rounded"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            minDate={currentDate}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Seleccione una fecha"
                        />
                        {selectedOriginOption ? (
                            <Link className="border-gray-300 border px-4 py-2 rounded" to={'/admin/vuelos-desde/' + selectedOriginOption.skyId + "?origenId=" + selectedOriginOption.value + "&date=" + selectedFormateddDate}>Ir</Link>
                        ) : (
                            <p>Seleccione una opción antes de continuar</p>
                        )}
                        <BtnCarrito></BtnCarrito>
                    </div>
                )}
            </div>
        </>
    );
}

export default CompBuscador