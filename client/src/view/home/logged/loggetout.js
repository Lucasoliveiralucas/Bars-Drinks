import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReviewItem from "../../../List/items/review-item";
const { getMultipleRandom, getAllReviews } = require("../../../services/api");
const LoggetOut = ({ barReviews }) => {
  const [random, setRandom] = useState([]);
  const [randomReviews, setRandomReviews] = useState([]);
  useEffect(() => {
    const getter = async () => {
      const data = await getMultipleRandom();
      setRandom(data.drinks);
      let drinkIdArray = [];
      //send rendom drinks to db and gets review data
      data.drinks.forEach((el) => {
        drinkIdArray.push(el.idDrink);
      });
      const allReviews = await getAllReviews(drinkIdArray);
      setRandomReviews(allReviews.drinks);
    };
    getter();
  }, []);
  return (
    <div className="home-logged-out">
      <div className="home-logged-out-list">
        <h2>Top Rated Bars</h2>
        <div>
          {barReviews ? (
            barReviews.map((item) => <ReviewItem data={item} key={item.bar} />)
          ) : (
            <></>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginRight: "2rem", width: "5rem" }}>
            Our Drink Selection
          </h2>
          <div className="random-drink-container-img">
            {random ? (
              random.map((data) => (
                <div className="random-drink-img">
                  <img src={data.strDrinkThumb}></img>
                  <Link
                    className="random-drink-img-text"
                    to={`/details/${data.idDrink}`}
                    state={data}
                  >
                    {data.strDrink}
                  </Link>
                  {/* {randomReviews[data.idDrink] ? (
                    <p> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  {/* {randomReviews[data.idDrink].rating}
                      -Stars at */}
                  {/* <b> {randomReviews[data.idDrink].bar}</b>
                    </p>
                  ) : (
                    <></>
                  )} */}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoggetOut;
