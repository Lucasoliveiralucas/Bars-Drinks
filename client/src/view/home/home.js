import { useEffect, useState } from "react";
import ItemImg from "../../List/items/drink-item-img";
// const { env } = require("../../../env");
function Home() {
  const [popular, setPopular] = useState([]);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };
  useEffect(() => {
    fetch("https://the-cocktail-db.p.rapidapi.com/popular.php", options)
      .then((response) => response.json())
      .then((response) => setPopular(response.drinks))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="Home">
      <div>
        <h2>Popular this Week</h2>
        <div className="drink-container-img">
          {popular.map((item) => (
            <ItemImg data={item} key={item.idDrink} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
