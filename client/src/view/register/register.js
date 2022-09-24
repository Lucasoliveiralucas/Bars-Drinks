import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const { register } = require("../../services/api");
const { loggedin } = require("../../redux/actions");
const Register = () => {
  const userDataStatus = useSelector((state) => state.userDataStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerData, setRegister] = useState({
    id: null,
    name: null,
    email: null,
    password: null,
    fav_components: null,
    age: 18,
    gender: "something",
  });

  const [passwordCheck, setCheck] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registerData.name || !registerData.email || !registerData.password)
      return alert("Fill all Data");
    let res;
    passwordCheck === registerData.password
      ? (res = await register(registerData))
      : alert("Passwords Mismatch");
    if (res.message) alert(res.message);
    else {
      const { accessToken } = res;
      localStorage.setItem("accessToken", accessToken);
      dispatch(loggedin({ user: registerData, logged: true }));
      navigate("/");
    }
    e.target.value.reset();
  };
  return (
    <div className="register-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h4 id="register-name-text">Name *</h4>
        <input
          type="text"
          name="name"
          placeholder="Name..."
          onChange={(e) =>
            setRegister({ ...registerData, name: e.target.value })
          }
        ></input>
        <h4>Email *</h4>
        <input
          type="text"
          name="email"
          placeholder="Email..."
          onChange={(e) =>
            setRegister({ ...registerData, email: e.target.value })
          }
        ></input>
        <h4>Password *</h4>
        <input
          type="password"
          name="password"
          placeholder="Pawssword..."
          onChange={(e) =>
            setRegister({ ...registerData, password: e.target.value })
          }
        ></input>
        <h4>Repeat Password *</h4>
        <input
          type="password"
          name="rpassword"
          placeholder="Password..."
          onChange={(e) => setCheck(e.target.value)}
        ></input>
        <h4>Favourite Drink Ingredients </h4>
        <input
          type="text"
          name="bar"
          placeholder="Vodka, Cinnamon..."
          onChange={(e) =>
            setRegister({ ...registerData, fav_components: e.target.value })
          }
        ></input>
        {/* <h4>Age *</h4>
        <input type="date" name="bar" placeholder="Bar..."></input>
        <h4>Gender *</h4>
        <input
          type="text"
          name="gender"
          placeholder="Gender..."
          onChange={(e) =>
            setRegister({ ...registerData, gender: e.target.value })
          }
        ></input> */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
