import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
const { login } = require("../../../services/api");
const Login = ({ props }) => {
  const [displayContainer, setDisplay] = useState("login-container-not");
  const [loginInfo, setLogin] = useState({
    email: null,
    password: null,
  });
  const handleSubmit = async (data) => {
    console.log(props);
    data.preventDefault();
    data.target.reset();
    const res = await login(loginInfo);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      const { accessToken } = res;
      localStorage.setItem("accessToken", accessToken);
      toggleLoginContainer();
      props.setLogged(true);
      //   auth.login(() => navigate("/profile"));
    }
  };
  const toggleLoginContainer = () => {
    displayContainer === "login-container-visible"
      ? setDisplay("login-container-not")
      : setDisplay("login-container-visible");
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    props.setLogged(false);
  };
  return (
    <>
      {props.logged ? (
        <button onClick={(e) => logout()}>logout</button>
      ) : (
        <div>
          <button onClick={(e) => toggleLoginContainer()}>login</button>
          <div className={displayContainer}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <h4>Email</h4>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  setLogin({ ...loginInfo, email: e.target.value })
                }
              ></input>
              <h4>Password</h4>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) =>
                  setLogin({ ...loginInfo, password: e.target.value })
                }
              ></input>
              <div>
                <Link
                  className="drink-img"
                  to={`/register`}
                  //   state={data}
                  onClick={(e) => toggleLoginContainer()}
                >
                  Register
                </Link>
                <button type="submit">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
