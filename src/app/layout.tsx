"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Credentials from "../components/UI/Credentials";
import Sidenavnew from "../components/Navigationbar/Sidenavnew";
import Navigationbar from "@/components/Navigationbar/Navigation";
import { usePathname } from "next/navigation";
import { registerLicense } from "@syncfusion/ej2-base";
import { UserProvider } from '@auth0/nextjs-auth0/client';



registerLicense(
  "Mgo+DSMBaFt/QHRqVVhlWFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jQHxTdkFmW3xWeXFSRg==;Mgo+DSMBPh8sVXJ0S0J+XE9BclRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31Tf0djWXtbcnddT2ddUQ==;ORg4AjUWIQA/Gnt2VVhkQlFac1tJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkxhWX9adXZWTmlUUkQ=;MjcxMTExMEAzMjMwMmUzNDJlMzBNNjRyV2dQU2pqOTRqT0V1T29vWkFXQ2tHc0g3Y20va0tLTVU0QmZqY0t3PQ==;MjcxMTExMUAzMjMwMmUzNDJlMzBDQjBqSm1xamV0bGViczBCdUlhY0FYdnJLSE4yV05uVEtoTkFDQ1c2RHJnPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFpGVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdUVqW39edHFXRWlcVUJ2;MjcxMTExM0AzMjMwMmUzNDJlMzBGN2RFMHBFdi9DZVpqdEVXZEpJRjRrQVJOM1N2NmJYUjZxQ3lXbDBYcWd3PQ==;MjcxMTExNEAzMjMwMmUzNDJlMzBEMTQwU3dDbklwUzdUWXhQTTFaSDlRbzc2T25ad1lYWDJQbFNCS0g3bDdvPQ==;Mgo+DSMBMAY9C3t2VVhkQlFac1tJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkxhWX9adXZWT2FdVEQ=;MjcxMTExNkAzMjMwMmUzNDJlMzBrNXhPU2RjU0I1emhiRFpuS1R5MURmQ2RZa1lhcmRMR2NBdllSOGMzbENNPQ==;MjcxMTExN0AzMjMwMmUzNDJlMzBmMWRNaVhkSDJOQ0RoRlFUUlRvVUw0aHNUSkx2UFhHSmZoU1FJZGZBZWRrPQ==;MjcxMTExOEAzMjMwMmUzNDJlMzBGN2RFMHBFdi9DZVpqdEVXZEpJRjRrQVJOM1N2NmJYUjZxQ3lXbDBYcWd3PQ=="
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
