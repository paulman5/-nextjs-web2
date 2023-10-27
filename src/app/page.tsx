"use client";

import Link from "next/link";

export default function page() {
  
  return (
    <div className="relative">
      <Link href="/test"></Link>
      <a href="/api/auth/login">Login</a>
    </div>
  );
}
