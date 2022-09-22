import { useRef } from "react";
import { useEffect, useState } from "react";
import List from "../../../List/list";
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
            "X-RapidAPI-Key":
              "97323259c3mshb808de60331839cp13854cjsnee8ba1559688",
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
      <List data={display.drinks} type="item text" />
    </>
  );
};
export default SearchBar;
