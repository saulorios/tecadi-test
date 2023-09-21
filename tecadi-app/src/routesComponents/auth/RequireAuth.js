import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const RequireAuth = () => {
    const auth = useContext(AuthContext);
    const location = useLocation();
    return(
        auth?.loggedInUser?.access_token ? <Outlet/> :  <Navigate to="/unauthorized" state={{ from: location }} replace /> 
    )
}
export default RequireAuth;