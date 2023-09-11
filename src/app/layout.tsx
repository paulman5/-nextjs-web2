import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Credentials from "../components/UI/Credentials";
import Sidenavnew from "../components/Navigationbar/Sidenavnew";
import Navigationbar from "@/components/Navigationbar/Navigation";


const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} application new-layout`}>
        <div className="page-overview">
          <Navigationbar />
          <div className="main-content">{children}</div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
