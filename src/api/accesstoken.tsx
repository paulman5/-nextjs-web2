import React, { useEffect } from "react";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AccessToken() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const handleGetUserInfo = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await fetch(
          "https://dev-nndt467y4bl6m363.us.auth0.com/api/v2/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          console.log("test");
          const userData = await response.json();
          console.log("User Data:", userData);
          // Handle user data as needed
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (user) {
      handleGetUserInfo(); // Call handleGetUserInfo() when the user is logged in
    }
  }, [user]); // Run the effect whenever the user object changes (login/logout)

  return <div></div>;
}
