
import React from "react";
import Popup from "../popup/popup.js";
import CompPopContainer from "../popup/popupContainer";
import { useLocation, Link, useNavigate, } from "react-router-dom";


const CompNavbar = () => {
    const location = useLocation()

    const shouldRender = !location.pathname.startsWith("/admin") ;

    if (!shouldRender) {
        return null;
    }
    return (
        <div className="bg-jaune">
            <div className="flex items-center justify-between gap-5 p-4 h-20">

                <div className="">
                    <Link to={'/'} className="text-3xl text-bleu font-[Cooper-bold]">Upnomada</Link>
                </div>
                <div className="flex gap-10 text-xl ">
                    <span className="text-white">    Más info  </span>
                    <button className="">
                        <Popup>
                            <CompPopContainer></CompPopContainer>
                        </Popup>
                    </button>
                </div>

            </div>

        </div>
    );
}
export default CompNavbar