import React from "react";
import Backarrowicon from "@/lib/icons/UIicons/Backarrowicon";

export default function Editonavigation() {
  return (
    <div>
      <div className="flex Document-navigation">
        <div className="flex center justify-center w-16 h-full border-r-2 border-indigo-500 border-solid">
          <button>
            <Backarrowicon />
          </button>
        </div>
        <div className="w-9/12"></div>
        <div className="flex w-2/12 gap-9  mr-10"></div>
      </div>
    </div>
  );
}
