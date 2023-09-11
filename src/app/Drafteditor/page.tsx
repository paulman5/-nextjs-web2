"use client";

import { useState, useEffect } from "react";
import Documenteditor from "../../components/Documenteditor/Documenteditor";
import Alert from "../../lib/icons/Alerticons/Alert";

export default function Draftpage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1300);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex flex-col justify-center items-center">
          <div
            className="relative left-0 right-0 top-0 bottom-0 flex flex-col content-center items-center bg-white h-48 z-50 rounded-2xl"
            style={{ width: "500px" }}
          >
            <div className="mt-7">
              <Alert />
            </div>
            <hr className="w-full mt-7"></hr>
            <div className="mt-7">
              Sorry, the drafteditor is only available on larger screen sizes.
            </div>
          </div>
        </div>
      ) : (
        <div className="relative left-28">
          <Documenteditor />
        </div>
      )}
    </>
  );
}
