import "./header.css";
import Login from "./login/login";
import SearchBar from "./searchBar/searchBar";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/api";
import { useEffect, useState } from "react";

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
        <Link to="/">Home</Link>
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
      <Login props={props} />
    </div>
  );
};

export default Header;
