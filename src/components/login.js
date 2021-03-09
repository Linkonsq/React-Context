import React from "react";
import { useAuth } from "../auth-context";
function Login() {
  const { login } = useAuth();
  // console.log(loggedIn);
  // console.log(login);
  return (
    <div>
      <p> This is Login</p>
      <button onClick={login}>Login </button>
    </div>
  );
}
export default Login;
