import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const CompFooter = () => {
    const location = useLocation();

    const shouldRender = !location.pathname.startsWith("/admin");

    if (!shouldRender) {
        return null;
    }

    return (
        <div className="bg-jaune grid grid-cols-1 md:grid-cols-2 py-10 mt-32">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold mb-4">Redes sociales</h2>
                <div className="flex gap-2">
                    <a href="https://urlgeni.us/instagram/DWk6" target="_blank" className="text-gray-700 hover:text-blue-500">
                        <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                    </a>
                    <a href="https://urlgeni.us/facebook/upnomadapage" target="_blank" className="text-gray-700 hover:text-blue-500">
                        <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
                    </a>
                    <a href="https://urlgeni.us/tiktok/upnomada" target="_blank" className="text-gray-700 hover:text-blue-500">
                        <FontAwesomeIcon icon={faTiktok} className="text-2xl" />
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold mb-4">Contacto</h2>
                <a href="mailto:soporte@upnomada.com" target="_blank" className="text-gray-700 hover:text-blue-500 flex">
                    <FontAwesomeIcon icon={faEnvelope} className="text-2xl mr-2" />
                    Correo de contacto: soporte@upnomada.com
                </a>
            </div>
        </div>
    );
}

export default CompFooter;
