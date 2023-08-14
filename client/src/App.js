import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import CompFooter from './footer/footer';

import CompLogin from './user/login';
import CompSign from './user/signin';
import CompProductDisplay from './payment/productDisplay';
import CompDashboard from './admin/dashboard';
import CompAdminShowPublicaciones from './admin/adminShowPublicaciones';
import CompAdminEditPublicacion from './admin/adminEditPublicacion';
import CompAdminUsers from './admin/showUsuariosAdmin';
import CompAdminAddUser from './admin/addUsuariosAdmin';
import CompResetPass from './user/resetPass';
import CompShowAllPublicaciones from './inicio/showAllPublicaciones';
import CompShowProfile from './user/profile';
import axios from 'axios';


function App() {

  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de almacenar el token cuando el usuario inicia sesión
        const res = await axios.get('http://localhost:5000/role/role/', {
          headers: {
            'x-auth-token': token,
          },
        });

        setUserRole(res.data.role);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expirado, borra el token del almacenamiento local
          localStorage.removeItem('token');
        } else {
          console.error('Error al cargar el rol del usuario:', error);
          setUserRole('none');
        }
      }
    }
    loadUserRole();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <CarritoProvider>
          <CompNavbar />
          <CompBuscador />
          <Routes>
            <Route path='/' element={<CompShowPublicaciones />} />
            <Route path='/publicaciones' element={<CompShowAllPublicaciones />} />
            <Route path='/accounts/password/reset' element={<CompResetPass />} />
            <Route path='/suscribirse' element={<CompProductDisplay />} />
            <Route path='/login' element={<CompLogin />} />
            <Route path='/signin' element={<CompSign />} />
            <Route path='/publicacion/:id' element={<CompShowDetallesPublicacion />} />

            {userRole === 'admin' ? (
              <>
                <Route path="/admin" element={<CompDashboard />} />
                <Route path="/admin/publicaciones" element={<CompAdminShowPublicaciones />} />
                <Route path="/admin/publicaciones/:id" element={<CompAdminEditPublicacion />} />
                <Route path="/admin/crear-publicacion" element={<CompAddPublicacion />} />
                <Route path="/admin/usuarios" element={<CompAdminUsers />} />
                <Route path="/admin/usuarios/crear-usuario" element={<CompAdminAddUser />} />
                <Route path="/admin/vuelos-desde/:origen" element={<CompResultados />} />
                <Route path="/admin/vuelos/:origen/:destino" element={<CompResultado />} />
                <Route path="/admin/vuelo/:origen/:destino" element={<CompVuelo />} />
                <Route path="/admin/elegir-vuelo/:origen/:destino" element={<CompElegirVuelo />} />
                <Route path="/admin/carrito" element={<Carrito />} />
              </>
            ) : null}


            {userRole === 'viewer' ? (

              <>
                <Route path="/perfil" element={<CompShowProfile />} />

              </>
            ) : null}

            <Route path="*" element={<CompShowPublicaciones />} />

          </Routes>
        </CarritoProvider>
        <CompFooter></CompFooter>
      </div>
    </BrowserRouter >
  );
}



export default App;
