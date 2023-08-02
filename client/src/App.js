import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import CompBuscador from './admin/buscador.js';
import CompResultados from './admin/resultados';
import CompResultado from './admin/resultado';
import CompVuelo from './admin/vuelo';
import CompElegirVuelo from './admin/elegirVuelo';
import CompAddPublicacion from './admin/addPublicacion';
import { CarritoProvider } from './carrito/CarritoContext';
import Carrito from "./carrito/carrito";
import CompShowPublicaciones from './inicio/showPublicaciones';
import CompShowDetallesPublicacion from './inicio/showDetallesPublicacion';
import CompNavbar from './header/navbar';

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <CarritoProvider>
          <CompNavbar />
          <CompBuscador />
          <Routes>
            <Route path='/' element={<CompShowPublicaciones />} />
            <Route path='/publicacion/:id' element={<CompShowDetallesPublicacion />} />

            <Route path='admin/crear-publicacion' element={<CompAddPublicacion />} />
            <Route path='admin/vuelos-desde/:origen' element={<CompResultados />} />
            <Route path='admin/vuelos/:origen/:destino' element={<CompResultado />} />
            <Route path='admin/vuelo/:origen/:destino' element={<CompVuelo />} />
            <Route path='admin/elegir-vuelo/:origen/:destino' element={<CompElegirVuelo />} />
            <Route path='admin/carrito' element={<Carrito />} />
          </Routes>
        </CarritoProvider>
      </div>
    </BrowserRouter >
  );
}



export default App;
