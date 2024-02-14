"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Credentials from "../components/UI/Credentials";
import Sidenavnew from "../components/Navigationbar/Sidenavnew";
import Navigationbar from "@/components/Navigationbar/Navigation";
import { usePathname } from "next/navigation";
import { registerLicense } from "@syncfusion/ej2-base";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";

registerLicense(
  "ORg4AjUWIQA/Gnt2UVhhQlVCfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Sd0JjXHpecXNTTmNc"
);

export interface UserProfile {
  email?: string | null;
  email_verified?: boolean | null;
  sub?: string | null;
}

export type UserContext = {
  user?: UserProfile;
  error?: Error;
  isLoading: boolean;
  checkSession: () => Promise<void>;
};


export type UseUser = () => UserContext;

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
