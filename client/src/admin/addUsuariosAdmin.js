import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

function CompAdminAddUser() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const URI = 'http://localhost:5000/user/';
  const [formData, setFormData] = useState({
    nombre_user: '',
    apellido_user: '',
    password_user: '',
    email_user: '',
    role: '',
    telefono_user: '',
    status: ''
  });

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'canceled', label: 'Canceled' },
    { value: 'refunded', label: 'Refunded' },
  ];

  const options = [
    { value: 'admin', label: 'Administrador' },
    { value: 'viewer', label: 'Visualizador' },
  ];


  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      role: selectedOption.value
    });
  };


  const handleSelectStatusChange = (selectedOption) => {
    setFormData({
      ...formData,
      status: selectedOption.value
    });
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(URI, formData, {
        headers: {
          "x-auth-token": token
        }
      });
      alert("Usuario creado exitosamente.");
      setFormData({
        nombre_user: '',
        apellido_user: '',
        password_user: '',
        email_user: '',
        role: '',
        telefono_user: '',
        status: ''
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("El usuario ya existe. Por favor, elija un correo electrónico diferente.");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col shadow-md p-16 mt-10 ml-56 h-screen bg-[#f8f9ff] max-w-8xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Agregar usuarios</h1>
      <div className="py-8">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <label className="flex flex-col">
              <span className="text-sm mb-1">Nombre:</span>
              <input
                type="text"
                id="nombre_user"
                name="nombre_user"
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.nombre_user}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm mb-1">Apellido:</span>
              <input
                type="text"
                id="apellido_user"
                name="apellido_user"
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.apellido_user}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm mb-1">Email:</span>
              <input
                type="text"
                id="email_user"
                name="email_user"
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email_user}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm mb-1">Contraseña:</span>
              <input
                type="password"
                id="password_user"
                name="password_user"
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password_user}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm mb-1">Rol:</span>
              <Select
                required
                id="role"
                name="role"
                options={options}
                onChange={handleSelectChange}
                value={{ value: formData.role, label: formData.role }}
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm mb-1">Teléfono:</span>
              <input
                type="text"
                name="telefono_user"
                value={formData.telefono_user}
                onChange={handleInputChange}
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm mb-1">Status:</span>
              <Select
                required
                id="status"
                name="status"
                options={statusOptions}
                onChange={handleSelectStatusChange}
                value={{ value: formData.status, label: formData.status }}
                className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Agregar"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}

export default CompAdminAddUser;
