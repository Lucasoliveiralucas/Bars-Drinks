import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { getSearch } = require("../../../services/api");

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState([]);
  const timeout = useRef();

  useEffect(() => {
    //searching drinks API
    clearTimeout(timeout.current);
    function getDrink(drink) {
      timeout.current = setTimeout(() => {
        const getter = async () => {
          const data = await getSearch(drink);
          search
            ? setDisplay({ drinks: data.drinks.slice(0, 15) })
            : setDisplay([]);
        };
        getter();
      }, 100);
    }
    getDrink(search);
  }, [search]);
  return (
    <>
      <form className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
      </form>
      <div className="drink-container-text">
        {display.drinks ? (
          display.drinks.map((item) => (
            <Link
              className="drink-text"
              to={`/details/${item.idDrink}`}
              state={item}
            >
              <h4
                onClick={(e) => {
                  setDisplay([]);
                  setSearch("");
                }}
              >
                {item.strDrink}
              </h4>
            </Link>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default SearchBar;
