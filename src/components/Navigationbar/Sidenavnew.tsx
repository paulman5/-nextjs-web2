"use client";

import { useState, useEffect } from "react";
import "../../styles/Sidebarstyling/Sidenavnew.css";
import { navData3 } from "../../lib/SidebarData/navData3";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Sidenavnew() {
  const [Expanded, setExpanded] = useState(false);
  const currentRoute = usePathname();
  console.log("rerender");

  useEffect(() => {
    console.log(currentRoute);
  }, [currentRoute]);

  return (
    <aside
      id="logo-sidebar"
      className="absolute top-0 left-0 w-60 h-screen transition-transform -translate-x-full border-r sm:translate-x-0 bg-darkblue"
      aria-label="Sidebar"
    >
      <div className="relative pt-20 flex flex-col h-full px-3 py-4 pb-4 overflow-y-auto gap-2  text-slate-800">
        {navData3.map(({ link, icon: Icon, title: Title }, index) => {
          const activeStyle =
            link === currentRoute ? "bg-hoverblue fill-white text-white" : "";
          return (
            <div key={index} className={`relative`}>
              <Link
                href={link}
                className={`row flex flex-row text-center items-center gap-5 rounded-md ${activeStyle} p-2 hover:fill-white hover:text-white transition-all duration-300`}
                style={{ color: "rgba(255,255,255,.65)", fill: "grey" }}
              >
                <span className="relative">
                  <Icon />
                </span>
                <span className=" font-medium">
                  <Title />
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
