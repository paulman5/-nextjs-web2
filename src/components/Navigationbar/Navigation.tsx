"use client";

import React from "react";
import Credentials from "../UI/Credentials";
import "../../styles/UI/Navigation.css";
import Settingsicon from "../../lib/icons/Sidebaricons/Settingsicon";
import NotificationsIcon from "../../lib/icons/Sidebaricons/Notification";
import { navData4 } from "../../lib/SidebarData/navData4";
import { constrainedMemory } from "process";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navigationbar() {
  const currentRoute = usePathname();

  function notificationcounter() {
    const count = 3;
    if (count > 0) {
      return <div className="Notification-counter">{count}</div>;
    }
  }

  return (
    <div
      className="Navigation-layout"
      style={{ width: "100vw", height: "50px" }}
    >
      <div className="Home-logo"></div>
      <div className="Navigation-item-layout">
        <div className="Navigation-items">
          {navData4.map(({ link, title: Title }, index) => {
            const activeStyle = link === currentRoute ? "fill-white" : "";
            const activeClass = link === currentRoute ? "active" : "";
            return (
              <div
                key={index}
                className={`Navigation-links relative ${activeClass}`}
              >
                <Link
                  href={link}
                  className={`row flex flex-row text-center items-center gap-5 rounded-md ${activeStyle} p-2 hover:fill-white hover:text-white transition-all duration-300`}
                >
                  <div className="Navigation-item">
                    <span className="font-medium text-neutral-900">
                      <Title />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Application-properties">
        <div className="Notificationsicon">
          <NotificationsIcon />
          {notificationcounter()}
        </div>
        <div className="Settingsicon">
          <Settingsicon />
        </div>
        <div className="Avatar-section">
          <Credentials
            user={{
              firstName: "Paul",
              lastName: "Mierlo",
            }}
          />
        </div>
      </div>
    </div>
  );
}
