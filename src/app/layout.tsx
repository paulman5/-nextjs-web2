"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Credentials from "../components/UI/Credentials";
import Sidenavnew from "../components/Navigationbar/Sidenavnew";
import Navigationbar from "@/components/Navigationbar/Navigation";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isLoginPage = pathname == "/Login";
  return (
    <html lang="en">
      <body className={`${inter.className} application new-layout`}>
        <div className="page-overview">
          {!isLoginPage && <Navigationbar />}
          <div className="main-content">{children}</div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
