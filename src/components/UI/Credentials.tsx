"use client"

import React from "react";
import { useState, useEffect } from "react";

interface CredentialsProps {
  user: {
    firstName: string;
    lastName: string;
  };
}

export default function Credentials({ user }: CredentialsProps) {
  const initials = user.firstName[0] + user.lastName[0];

  return (
    <div className="avatar placeholder">
      <div className="text-black rounded-full w-8 center bg-green-500">
        <span>
          <div>{initials}</div>
        </span>
      </div>
    </div>
  );
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
