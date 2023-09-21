import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../stack/request";
import { AuthContext } from "../../contexts/authContext";

import TextInput from "../../components/TextInput";

function Login(props) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", username: "" });
  const [error, setError] = useState(null);
  
  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
        const response = await request.login(state.username, state.password)
        
      if(response.access_token) {
        authContext.setLoggedInUser({ ...response });
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...response })
        );
        setError(null);
        navigate("/home")
      } else {
        setError([response.code, response.message]);
      }
      
        
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error ? <div className="alert alert-danger"><b>{error[0]}:</b> {error[1]}</div> : null}
        <TextInput
          label="Username"
          type="text"
          name="username"
          id="signupFormUsername"
          value={state.username}
          onChange={handleChange}
        />

        <TextInput
          label="Senha"
          type="password"
          name="password"
          id="signupFormPassword"
          value={state.password}
          onChange={handleChange}
        />

        

        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Entrar
          </button>
        </div>
        <br/>
      </form>
    </div>
  );
}

export default Login;