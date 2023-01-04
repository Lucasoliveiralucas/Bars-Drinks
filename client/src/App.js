import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./view/home/home";
// import Details from "./view/details/details";
import Header from "./view/header/header";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedin } from "./redux/actions";
import { refreshUser } from "./services/api";
const Details = lazy(() => import("./view/details/details"));

function App() {
  const { user } = useSelector((state) => state.userDataStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    const isUserLogged = localStorage.getItem("accessToken");
    const getter = async () => {
      if (isUserLogged && !user.name) {
        const updatedUser = await refreshUser(isUserLogged);
        dispatch(loggedin({ user: { ...updatedUser }, logged: true }));
      }
    };
    getter();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<h1>wait yo</h1>}>
          <Header />
          <Routes>
            <Route path="/details/:id" element={<Details />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
