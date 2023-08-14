import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
function CompDashboard() {
    const [userRole, setUserRole] = useState("")
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Estado para controlar la apertura del submenú
    const [isUsuariosSubMenuOpen, setIsUsuariosSubMenuOpen] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleSubMenuToggle = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    }

    const handleUsuariosSubMenuToggle = () => {
        setIsUsuariosSubMenuOpen(!isUsuariosSubMenuOpen);
    }

    //FIXME: Añadir el ver y modificar usuarios
    return (
        <div className="flex fixed">
            <div className="">
                <div className="flex flex-col mt-24 px-8 gap-28">
                    <h1 className="text-2xl font-semibold text-bleu">Dashboard</h1>

                    <Link className="text-md font-bold text-gray-600">Crear viaje</Link >


                    <div className="">
                        <Link to={"/admin/publicaciones"} className="text-md font-bold text-gray-600" onClick={handleSubMenuToggle}>Publicaciones
                            <FontAwesomeIcon icon={faAngleDown} className="ml-2" /></Link >
                        <AnimatePresence>
                            {isSubMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-5 "
                                >
                                    <Link to={"/admin/crear-publicacion"} className="text-sm font-bold text-gray-600">
                                        Crear Publicación
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="">
                        <Link to={"/admin/usuarios"} className="text-md font-bold text-gray-600" onClick={handleUsuariosSubMenuToggle}>Usuarios
                            <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
                        </Link>
                        <AnimatePresence>
                            {isUsuariosSubMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-5 "
                                >
                                    <Link to={"/admin/usuarios/crear-usuario"} className="text-sm font-bold text-gray-600">
                                        Crear Usuario
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CompDashboard;
