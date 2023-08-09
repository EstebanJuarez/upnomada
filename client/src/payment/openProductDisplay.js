import React, { useState } from "react";
import CompProductDisplay from "./productDisplay.js";

const CompButtonOpen = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button
                type="button"
                className="bg-[rgb(37,97,117)] py-2 rounded text-white hover:bg-jaune transition-all hover:text-black"
                onClick={() => setIsModalOpen(true)}
            >
                Abrir Modal
            </button>

            <CompProductDisplay isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    );
};

export default CompButtonOpen;
