import React from 'react';
import { useModal } from '../../hooks/Modalhook';


type SharemodalProps = {
    closeModal: () => void;
  };
  
export default function Sharemodal(props: SharemodalProps) {
const { showModal, closeModal } = useModal();

  return (
    <div>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-50"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8">
          <p className="text-gray-600 mb-4">
            Copy the link below to share this document with others:
          </p>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            value="https://example.com/document"
            readOnly
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={props.closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
