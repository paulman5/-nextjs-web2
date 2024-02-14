"use client";

import React from "react";
import { useState, useEffect } from "react";

interface CredentialsProps {
  user: {
    firstName: string;
    lastName: string;
  };
  displayInitials?: boolean; // Optional prop to control the display
}

export default function Credentials({
  user,
  displayInitials = true,
}: CredentialsProps) {
  const initials = user.firstName[0] + user.lastName[0];
  if (displayInitials) {
    return (
      <div className="avatar placeholder">
        <div className=" text-black w-8 h-8 rounded-full bg-green-500 flex justify-center items-center">
          <span>
            <div>{initials}</div>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
    );
  }
}

export function CredentialsFetcher() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:27012/auth/user?email=$#{email}")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  if (user === null) {
    return null;
  }

  return <Credentials user={user} />; // typescript sees user format as null so it waits till a user account is fetched from mongodb
}
