import axios from "axios"

import dotenv from 'dotenv';
dotenv.config();

const scanner = process.env.SCANNER;
export const searchAirport = async (destino, title) => {

    const options = {
        method: 'GET',
        url: 'https://api1.diversesaga.com/api/v2/searchAirport',
        params: { query: destino },
        headers: {
            'Authorization': scanner,
        },
    };
    try {

        const response = await axios.request(options);
        const data = response.data.data;
        if (!data || data.length === 0) {
            // Si no se encontraron datos con destino, realizar búsqueda con title como parámetro del query
            if (title) {
                const optionsWithTitle = {
                    method: 'GET',
                    url: 'https://api1.diversesaga.com/api/v2/searchAirport',
                    params: { query: title },
                    headers: {
                        'Authorization': scanner,
                     },
                };

                const responseWithTitle = await axios.request(optionsWithTitle);
                const dataWithTitle = responseWithTitle.data.data;
                if (!dataWithTitle) {
                    console.error('No se encontraron datos para el destino ni para el título');
                    return [];
                }

                const airportAndCityEntityIdsWithTitle = dataWithTitle
                    .filter(
                        (item) =>
                            item.navigation.entityType === 'AIRPORT' ||
                            item.navigation.entityType === 'CITY'
                    )
                    .map((item) => item.navigation.entityId);

                return airportAndCityEntityIdsWithTitle;
            } else {
                console.error('No se encontraron datos para el destino');
                return [];
            }
        }

        console.log(data);

        const airportAndCityEntityIds = data
            .filter(
                (item) =>
                    item.navigation.entityType === 'AIRPORT' ||
                    item.navigation.entityType === 'CITY'
            )
            .map((item) => item.navigation.entityId);

        return airportAndCityEntityIds;
    } catch (error) {
        console.error(error);
    }
};





export const searchFlights = async (req, res) => {

    const { origenId, origen, destino, title, date } = req.body;
    // Aquí puedes utilizar los datos recibidos en el cuerpo de la solicitud
    const airportAndCityEntityIds = await searchAirport(destino, title)
    console.log(airportAndCityEntityIds);
    // tengo que recorrer los ariportandcity para obtener varios resultados
    //
    //
    //
    //
    //
    const options = {
        method: 'GET',
        url: 'https://api1.diversesaga.com/api/v2/searchFlights',
        params: {
            originSkyId: origen,
            originEntityId: origenId,
            destinationSkyId: destino,
            destinationEntityId: airportAndCityEntityIds[0],
            date: date,
            sortBy: 'price_low',
            currency: 'USD'
        },
        headers: {
            'Authorization': scanner,
         },
    };

    try {
        const response = await axios.request(options);
        return res.status(200).json({ response: response.data, airport: airportAndCityEntityIds[0] });

    } catch (error) {

        console.error(error);

    }

}



export const searchFlightEverywhere = async (req, res) => {

    const origen = req.body.origen
    const options = {
        method: 'GET',
        url: 'https://api1.diversesaga.com/api/v2/searchFlightEverywhere',
        params: {
            originSkyId: origen,
            oneWay: 'false',
            currency: 'USD'
        },
        headers: {
            'Authorization': scanner,
         },
    };

    try {
        const response = await axios.request(options);
        const flightData = response.data.data;

        // Aquí puedes procesar los datos de la respuesta antes de enviarlos como respuesta
        // Puedes filtrar, mapear, transformar u ordenar los resultados según tus necesidades.
        res.json(flightData); // Envía los datos procesados como respuesta en formato JSON.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar vuelos en todas partes.', error });
    }
};



export const searchFlightEverywhereDetails = async (req, res) => {
    const { origen, destino } = req.body;

    const options = {
        method: 'GET',
        url: 'https://api1.diversesaga.com/api/v2/searchFlightEverywhereDetails',
        params: {
            originSkyId: origen,
            CountryId: destino,
            oneWay: 'false',
            currency: 'USD'
        },
        headers: {
            'Authorization': scanner,
         },
    };

    try {
        const response = await axios.request(options);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al buscar vuelos en todas partes.' });
    }
};




export const getFlightDetails = async (req, res) => {
    console.log("getFlightDetails");
    const { origen, destino, id, sessionId, date } = req.body;
    const options = {
        method: 'GET',
        url: 'https://api1.diversesaga.com/api/v2/getFlightDetails',
        params: {
            itineraryId: id,
            legs: `[{"destination":"${destino}","origin":"${origen}","date":"${date}"}]`,
            adults: '1',
            sessionId: sessionId,
            currency: 'USD'
        },
        headers: {
            'Authorization': scanner,
         },
    };

    try {
        const response = await axios.request(options);
        console.log(response);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al getFlightDetails.', error });
    }
}



export const searchFlightsMultiStops = async (req, res) => {
    const { origen, destino, id, sessionId, date } = req.body;


    const options = {
        method: 'GET',
        url: 'https://api1.diversesaga.com/api/v2/searchFlightsMultiStops',
        params: {
            legs: '[{"origin":"LHR","originEntityId":"95565050","destination":"JFK","destinationEntityId":"95565058","date":"2024-01-07"},{"originEntityId":"95565058","destination":"LHR","destinationEntityId":"95565050","origin":"JFK","date":"2024-01-12"}]',
            adults: '1',
            sortBy: 'price_low',
            currency: 'USD'
        },
        headers: {
            'Authorization': scanner,
         },
    };

    try {
        const response = await axios.request(options);
        return res.status(200).json(response.data);

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al getFlightDetails.', error });

    }
}


export const getPriceCalendar = async (req, res) => {

    const { origen, destino, id, date } = req.body;

    const options = {
        method: 'GET',
        url: 'https://api1.diversesaga.com/api/v2/getPriceCalendar',
        params: {
            originSkyId: origen,
            destinationSkyId: destino,
            arrivalDate: date,
            currency: 'USD'
        },
        headers: {
            'Authorization': scanner,
         },
    };
    try {
        const response = await axios.request(options);
        return res.status(200).json(response.data);

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al getFlightDetails.', error });

    }
}




// entityId:"39151418"
// entityType:"CITY"
// localizedName:"Mexico City"
// skyId:"MEXA"


// entityId: "95673321"
// entityType: "AIRPORT"
// localizedName: "Mexico City Juarez International"
// skyId: "MEX"


// navigation:
// entityId: "129053801"
// entityType: "AIRPORT"
// localizedName: "Mexico City Santa Lucia"
// skyId: "NLU"


// entityId: "29475432"
// entityType: "COUNTRY"
// localizedName: "Mexico"
// skyId: "MX"


// entityId: "95673471"
// entityType: "AIRPORT"
// localizedName: "Tijuana"
// skyId: "TIJ"