import React from "react";
import "./LoginHeader.css";
import { Link } from "react-router-dom";

function LoginHeader() {
  return (
    <div>
      <nav className="login__headernav">
        <Link className="login__headernav__link">
          <span className="login__headernav__text">urbanWater Cloud</span>
        </Link>
      </nav>
    </div>
  );
}

export default LoginHeader;