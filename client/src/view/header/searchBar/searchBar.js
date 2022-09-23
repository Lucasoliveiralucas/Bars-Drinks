import { useRef } from "react";
import { useEffect, useState } from "react";
import ItemText from "../../../List/items/drink-item-text";
// require("dotenv").config();

const SearchBar = () => {
  const [search, setDrink] = useState("");
  const [display, setDisplay] = useState([]);
  const timeout = useRef();

  useEffect(() => {
    clearTimeout(timeout.current);
    function getMovie(drink) {
      if (!drink.length) return setDisplay([]);
      timeout.current = setTimeout(() => {
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "",
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
          },
        };

        fetch(
          `https://the-cocktail-db.p.rapidapi.com/search.php?s=${drink}`,
          options
        )
          .then((response) => response.json())
          .then((response) => setDisplay(response))
          .catch((err) => console.error(err));
      }, 100);
    }
    getMovie(search);
  }, [search]);
  return (
    <>
      <form className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setDrink(e.target.value)}
        ></input>
      </form>
      <div className="drink-container-text">
        {display.drinks ? (
          display.drinks.map((item) => (
            <ItemText data={item} key={item.idDrink} />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default SearchBar;
