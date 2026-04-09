import React, { useState } from "react";
import { loginUser } from "./api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await loginUser({ username, password });
    console.log(res);
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;
