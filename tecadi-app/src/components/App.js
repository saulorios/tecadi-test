import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { AuthContextComponent } from "../contexts/authContext";
import Unauthorized from "../routesComponents/auth/Unauthorized"
import RequireAuth from "../routesComponents/auth/RequireAuth";
import Login from "../routesComponents/auth/Login";
import Home from "../routesComponents/home";
import Create from "../routesComponents/products/create";
import Update from "../routesComponents/products/update";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>  
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route element={<RequireAuth/>}>
            <Route exact path="/home" Component={Home} />
            <Route exact path="/create" Component={Create} />
            <Route exact path="/update" Component={Update} />
          </Route>
        </Routes>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
