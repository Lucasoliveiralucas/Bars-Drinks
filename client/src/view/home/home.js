import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ItemImg from "../../List/items/drink-item-img";
import LoggedIn from "./logged/loggedin";
import LoggetOut from "./logged/loggetout";
const { getPopular, getCategories } = require("../../services/api");

function Home() {
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user, logged } = useSelector((state) => state.userDataStatus);

  useEffect(() => {
    const getter = async () => {
      const { drinks } = await getPopular();
      setPopular(drinks);
      const cat = await getCategories();
      setCategories(cat.drinks);
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
        {logged ? <LoggedIn /> : <LoggetOut />}
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
