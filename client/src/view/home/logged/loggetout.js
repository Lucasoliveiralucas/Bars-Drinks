import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReviewItem from "../../../List/items/review-item";
import Register from "../../register/register";
const { getMultipleRandom, getAllReviews } = require("../../../services/api");
const LoggetOut = ({ barReviews }) => {
  const [random, setRandom] = useState([]);

  useEffect(() => {
    const getter = async () => {
      const random = await getMultipleRandom();
      setRandom(random.drinks);
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
        <div className="random-drink-container-img">
          {random ? (
            random.map((data) => (
              <div className="random-drink-img">
                <img src={data.strDrinkThumb}></img>
                <div>
                  <Link
                    className="random-drink-img-text"
                    to={`/details/${data.idDrink}`}
                    state={data}
                  >
                    {data.strDrink}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default LoggetOut;
