import React, { useState } from "react";
import { useModal } from "../../hooks/Modalhook";
import Backarrowicon from "@/lib/icons/UIicons/Backarrowicon";
import "../../styles/Animations/Backarrowanimation.css";

type SharemodalProps = {
  closeModal: () => void;
};

export default function Signaturemodal(props: SharemodalProps) {
  const [value, setValue] = useState("");

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8">
          <button
            onClick={props.closeModal}
            className="Backarrow relative bottom-5"
          >
            <div>
              <Backarrowicon />
            </div>
          </button>
          <p className="text-gray-600 mb-4">
            Type in your name for your signature
          </p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={value}
            onChange={handleChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={!value}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}
