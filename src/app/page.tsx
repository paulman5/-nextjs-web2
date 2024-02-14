"use client";

import Link from "next/link";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";


export default function page() {

  const { user, isLoading } = useUser();


  return (
    <div className="relative">
      <Link href="/test"></Link>
      <a href="/api/auth/login">Login </a>
      <p>{user?.email}</p>
      <div><form><input></input><button>ok</button></form></div>
    </div>
  );
}

