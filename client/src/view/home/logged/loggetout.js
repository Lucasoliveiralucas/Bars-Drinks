import { useEffect, useState } from "react";
import ItemImg from "../../../List/items/drink-item-img";
import ReviewItem from "../../../List/items/review-item";
import Register from "../../register/register";
const { getMultipleRandom, getAllReviews } = require("../../../services/api");
const LoggetOut = () => {
  const [random, setRandom] = useState([]);
  const [barReviews, setBarReviews] = useState([]);

  useEffect(() => {
    const getter = async () => {
      const random = await getMultipleRandom();
      setRandom(random.drinks);
      const allReviews = await getAllReviews();
      setBarReviews(allReviews);
    };
    getter();
  }, []);
  return (
    <div className="home-logged-out">
      <div>
        <h2>Register</h2>
        <Register />
      </div>

      <div className="home-logged-out-list">
        <h2>Top Rated Bars</h2>
        <div>
          {barReviews ? (
            barReviews.map((item) => <ReviewItem data={item} key={item.bar} />)
          ) : (
            <></>
          )}
        </div>
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
  );
};
export default LoggetOut;
