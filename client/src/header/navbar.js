
import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faUser } from "@fortawesome/free-solid-svg-icons";

const CompNavbar = () => {



    return (
        <div>
            <div className="flex items-center justify-between gap-5 bg-jaune p-4 h-20">
                <div className="">
                    <Link to={'/'} className="text-3xl text-bleu font-[Cooper-bold]">Upnomada</Link>
                </div>
                <div className="flex gap-10 text-xl ">
                    <span className="">    Más info  </span>
                    <button className="">
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                    </button>
                </div>
            </div>

            <div className="test h-80">

            </div>
        </div>
    );
}
export default CompNavbar