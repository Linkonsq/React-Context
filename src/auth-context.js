import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setloggedIn] = useState(false);
  /**
   * Delay for a number of milliseconds
   */
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const login = () => {
    sleep(2000).then(() => setloggedIn(true));
  };

  const logout = () => {
    sleep(2000).then(() => setloggedIn(false));
  };

  const authContextValue = { login, logout, loggedIn };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
