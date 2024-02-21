import Backarrowicon from "@/lib/icons/UIicons/Backarrowicon"
import Shareicon from "@/lib/icons/UIicons/Shareicon"
import React from "react"
import { useModal } from "../../hooks/Modalhook"
import Sharemodal from "../Modals/Sharemodal"

export default function Templatingscreen() {
  const { showModal, openModal, closeModal } = useModal()

  return (
    <div>
      {" "}
      <div className="flex Document-navigation">
        <div className="flex center justify-center w-16 h-full border-r-2 border-indigo-500 border-solid">
          <button>
            <Backarrowicon />
          </button>
        </div>
        <div className="w-9/12"></div>
        <div className="flex w-2/12 gap-9  mr-10">
          <button
            onClick={openModal}
            className="relative flex self-center text-center items-center justify-center text-sm bg-newblack text-white h-10 w-28 rounded gap-2 hover:bg-gray-600 transition-all"
          >
            <Shareicon />
            Share
          </button>
          <button className="relative flex self-center text-center items-center justify-center text-sm bg-newgreen text-white h-10 w-28 rounded hover:bg-green-400 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
