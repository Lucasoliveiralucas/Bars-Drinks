import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./view/home/home";
import Details from "./view/details/details";
import Header from "./view/header/header";
import Register from "./view/register/register";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedout, loggedin } from "./redux/actions";
import { refreshUser } from "./services/api";

function App() {
  const { user } = useSelector((state) => state.userDataStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    const isUserLogged = localStorage.getItem("accessToken");
    const getter = async () => {
      if (isUserLogged && !user.name) {
        console.log("not supped");
        const updatedUser = await refreshUser(isUserLogged);
        dispatch(loggedin({ user: { ...updatedUser }, logged: true }));
      }
    };
    getter();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/details/:id" element={<Details />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
