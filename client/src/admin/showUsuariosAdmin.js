import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select';

import axios from 'axios';

function CompAdminUsers() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const URI = 'http://localhost:5000/user/'

  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
    else {
      obtenerUsuarios()
    }
  }, []);
  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(URI, {
        headers: {
          "x-auth-token": token
        }
      });
      setUsuarios(res.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUserById = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {

      try {
        await axios.delete(URI + id, {
          headers: {
            "x-auth-token": token
          }
        });
        obtenerUsuarios();
      } catch (error) {
        console.log(error);
        // mostrar mensaje de error al usuario
      }
    }

  }

  return (



    <div className="flex flex-col  shadow-md p-16 mt-10 ml-56  bg-[#f8f9ff] max-w-8xl  ">
<table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-md overflow-hidden">
  <thead className="bg-gray-100">
    <tr>
      <th className="py-2 px-4 text-left">Nombre</th>
      <th className="py-2 px-4 text-left">Apellido</th>
      <th className="py-2 px-4 text-left">Teléfono</th>
      <th className="py-2 px-4 text-left">Email</th>
      <th className="py-2 px-4 text-left">status</th>
      <th className="py-2 px-4 text-left">Rol</th>
      <th className="py-2 px-4 text-left">Customer ID</th>
      <th className="py-2 px-4 text-left">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {usuarios.map((usuario) => (
      <tr key={usuario.id_user} className="border-t border-gray-300">
        <td className="py-2 px-4">{usuario.nombre_user}</td>
        <td className="py-2 px-4">{usuario.apellido_user}</td>
        <td className="py-2 px-4">{usuario.telefono_user}</td>
        <td className="py-2 px-4">{usuario.email_user}</td>
        <td className="py-2 px-4">{usuario.status}</td>
        <td className="py-2 px-4">{usuario.role}</td>
        <td className="py-2 px-4">{usuario.customer_id}</td>
        <td className="py-2 px-4">
          <div className="space-x-2">
            <Link to={`/admin/usuarios/edit/${usuario.id_user}`}>
              <button className="bg-blue-500 text-white px-2 rounded hover:bg-cyan-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                Editar
              </button>
            </Link>
            <button
              onClick={() => deleteUserById(usuario.id_user)}
              className="bg-red-500 px-2 rounded hover:bg-red-600 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>



  );
}

export default CompAdminUsers;
