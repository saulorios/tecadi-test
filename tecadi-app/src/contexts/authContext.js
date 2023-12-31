import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext({ token: {} });

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ token: {} });
  
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedStoredUser = JSON.parse(storedUser || '""');

    if (parsedStoredUser.user) {
      setLoggedInUser({ ...parsedStoredUser });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextComponent, AuthContext };