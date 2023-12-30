import React from "react";

export default function Login() {
  return (
    <div>
      <div>Login</div>
      <div>
        <input placeholder="First Name"></input>
        <input placeholder="Last Name"></input>
      </div>
      <div>
        <button className="w-20 bg-sky-600">Submit</button>
      </div>
    </div>
  );
}
