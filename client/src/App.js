import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./view/home/home";
import Details from "./view/details/details";
import Header from "./view/header/header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/details/:id" element={<Details />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
