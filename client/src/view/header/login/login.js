import React, { useState } from "react";
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();
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
        <button onClick={(e) => logout()}>
          <i>Logout</i>
        </button>
      ) : (
        <div>
          <button
            style={{
              cursor: "pointer",
              border: "none",
              backgroundColor: "transparent",
              marginTop: "1.3rem",
              color: "white",
            }}
            onClick={(e) => toggleLoginContainer()}
          >
            <i>Login</i>
          </button>
          <div
            className={displayContainer}
            style={{
              backgroundColor: "rgb(70, 63, 58)",
              height: "15rem",
              borderRadius: "10px",
              width: "20rem",
            }}
          >
            <form
              onSubmit={(e) => handleSubmit(e)}
              style={{ marginLeft: "1rem" }}
            >
              <h4>Email</h4>
              <input
                style={{ width: "17rem" }}
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  setLogin({ ...loginInfo, email: e.target.value })
                }
              ></input>
              <h4>Password</h4>
              <input
                style={{ width: "17rem" }}
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) =>
                  setLogin({ ...loginInfo, password: e.target.value })
                }
              ></input>
              <div>
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
