import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const { loggedin, loggedout } = require("../../../redux/actions");
const { login } = require("../../../services/api");

const Login = () => {
  const { logged } = useSelector((state) => state.userDataStatus);
  const dispatch = useDispatch();
  const [displayContainer, setDisplay] = useState("login-container-not");
  const [loginInfo, setLogin] = useState({
    email: null,
    password: null,
  });
  const handleSubmit = async (data) => {
    data.preventDefault();
    data.target.reset();
    const res = await login(loginInfo);
    console.log(res);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      const { accessToken } = res;
      const { user } = res;
      localStorage.setItem("accessToken", accessToken);
      toggleLoginContainer();
      dispatch(loggedin({ user: { ...user }, logged: true }));
    }
  };
  const toggleLoginContainer = () => {
    displayContainer === "login-container-visible"
      ? setDisplay("login-container-not")
      : setDisplay("login-container-visible");
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch(loggedout());
  };
  return (
    <>
      {logged ? (
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
