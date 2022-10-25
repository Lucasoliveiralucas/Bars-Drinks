import "./header.css";
import Login from "./login/login";
import SearchBar from "./searchBar/searchBar";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/api";
import { useEffect, useState } from "react";
import Register from "./register/register";
import { BiDrink } from "react-icons/bi";
const Header = (props) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getter = async () => {
      //get drink categories
      const cat = await getCategories();
      setCategories(cat.drinks);
    };
    getter();
  }, []);
  return (
    <div className="header">
      <div>
        <Link to="/" style={{ marginLeft: "1rem", marginRight: "1rem" }}>
          {" "}
          <BiDrink color="rgb(244, 243, 238)" />
        </Link>
        <div className="dropdown">
          <h1 className="dropbtn">CATEGORIES</h1>
          <div className="categories-container">
            {categories ? (
              categories.map((item) => <h3>{item.strCategory}</h3>)
            ) : (
              <></>
            )}
            <h3>Advanced Search</h3>
            <h3>Surprise me!</h3>
          </div>
        </div>
      </div>
      <div>
        <SearchBar />
      </div>
      <div style={{ display: "flex" }}>
        <Login props={props} />
        <h4>/</h4>
        <Register />
      </div>
    </div>
  );
};

export default Header;
