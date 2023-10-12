"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Credentials from "../components/UI/Credentials";
import Sidenavnew from "../components/Navigationbar/Sidenavnew";
import Navigationbar from "@/components/Navigationbar/Navigation";
import { usePathname } from "next/navigation";
import { registerLicense } from "@syncfusion/ej2-base";
import { UserProvider } from "@auth0/nextjs-auth0/client";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH9fcnVQR2RfWUN1VkQ="
);


const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isAuthPage = pathname == "/Login" || pathname == "/Signup";
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${inter.className} application new-layout`}>
          <div className="page-overview">
            {!isAuthPage && <Navigationbar />}
            <div className="main-content">{children}</div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
};

export default Layout;
