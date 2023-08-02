import express from 'express'

import { searchAirport, searchFlightEverywhere, searchFlightEverywhereDetails, searchFlights, getFlightDetails, searchFlightsMultiStops, getPriceCalendar } from "../controllers/vuelo.js";
const routerFlights = express.Router()


routerFlights.post('/', searchFlights)
routerFlights.post('/searchEverywhere', searchFlightEverywhere)
routerFlights.post('/searchEverywhereDetails', searchFlightEverywhereDetails)
routerFlights.post('/getFlightDetails', getFlightDetails)
routerFlights.post('/searchFlightsMultiStops', searchFlightsMultiStops)
routerFlights.post('/getPriceCalendar', getPriceCalendar)



export default routerFlights
