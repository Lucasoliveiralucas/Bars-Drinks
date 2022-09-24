import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./view/home/home";
import Details from "./view/details/details";
import Header from "./view/header/header";
import { useEffect, useState } from "react";
import Register from "./view/register/register";

function App() {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const res = localStorage.getItem("accessToken");
    res ? setLogged(true) : setLogged(false);
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Header logged={logged} setLogged={setLogged} />
        <Routes>
          <Route path="/details/:id" element={<Details />}></Route>
          <Route
            path="/"
            element={<Home logged={logged} setLogged={setLogged} />}
          ></Route>
          <Route
            path="/register"
            element={<Register logged={logged} setLogged={setLogged} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
