import { useRef } from "react";
import { useEffect, useState } from "react";
import ItemText from "../../../List/items/drink-item-text";
const { getSearch } = require("../../../services/api");

const SearchBar = () => {
  const [search, setDrink] = useState("");
  const [display, setDisplay] = useState([]);
  const timeout = useRef();

  useEffect(() => {
    clearTimeout(timeout.current);
    function getMovie(drink) {
      timeout.current = setTimeout(() => {
        const getter = async () => {
          const data = await getSearch(drink);
          search ? setDisplay(data) : setDisplay([]);
        };
        getter();
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
