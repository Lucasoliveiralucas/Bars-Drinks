import { useEffect, useState } from "react";
import ItemImg from "../../List/items/drink-item-img";
import Register from "../register/register";
const {
  getPopular,
  getCategories,
  getMultipleRandom,
} = require("../../services/api");

function Home(props) {
  const [popular, setPopular] = useState([]);
  const [random, setRandom] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getter = async () => {
      const { drinks } = await getPopular();
      setPopular(drinks);
      const cat = await getCategories();
      setCategories(cat.drinks);
      const random = await getMultipleRandom();
      setRandom(random.drinks);
    };
    getter();
  }, []);
  return (
    <div className="home">
      <div className="categories-container">
        {categories ? (
          categories.map((item) => <h2>{item.strCategory}</h2>)
        ) : (
          <></>
        )}
        <h2>Advanced Search</h2>
        <h2>Surprise me!</h2>
      </div>
      <div>
        <div className="home-logged-out">
          <div>
            <h2>Register</h2>
            <Register />
          </div>

          <div className="home-logged-out-list">
            <h2>Our Selection</h2>
            <div className="drink-container-img">
              {random ? (
                random.map((item) => <ItemImg data={item} key={item.idDrink} />)
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <h2>Popular this Week</h2>
        <div className="drink-container-img">
          {popular ? (
            popular.map((item) => <ItemImg data={item} key={item.idDrink} />)
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
