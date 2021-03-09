import React from "react";
import { useAuth } from "../auth-context";

function Profile() {
  const { logout } = useAuth();
  return (
    <div>
      <p> This is Profile </p>
      <button onClick={logout}> logout </button>
    </div>
  );
}
export default Profile;
