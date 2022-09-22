import List from "../../List/list";
import { useEffect, useState } from "react";

function Home() {
  const [popular, setPopular] = useState([]);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "97323259c3mshb808de60331839cp13854cjsnee8ba1559688",
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
        <List data={popular} type="img" />
      </div>
    </div>
  );
}
export default Home;
