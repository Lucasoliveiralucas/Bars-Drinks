import "./home.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoggedIn from "./logged/loggedin";
import LoggetOut from "./logged/loggetout";
const {
  getPopular,
  getCategories,
  getAllReviews,
} = require("../../services/api");

function Home() {
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user, logged } = useSelector((state) => state.userDataStatus);
  const [barReviews, setBarReviews] = useState([]);
  const [popularReviews, setPopularReviews] = useState([]);

  useEffect(() => {
    const getter = async () => {
      //get popular drinks
      const { drinks } = await getPopular();
      setPopular(drinks);
      let drinkIdArray = [];
      //send popular drinks to db and gets review data
      drinks.forEach((el) => {
        drinkIdArray.push(el.idDrink);
      });
      const allReviews = await getAllReviews(drinkIdArray);
      setBarReviews(allReviews.bars);
      setPopularReviews(allReviews.drinks);
      //get drink categories
      const cat = await getCategories();
      setCategories(cat.drinks);
    };
    getter();
  }, []);
  return (
    <div className="home">
      {/* <div className="categories-container">
        {categories ? (
          categories.map((item) => <h2>{item.strCategory}</h2>)
        ) : (
          <></>
        )}
        <h2>Advanced Search</h2>
        <h2>Surprise me!</h2>
      </div> */}
      <div>
        {logged ? <LoggedIn /> : <LoggetOut barReviews={barReviews} />}
        <div className="drink-container-img">
          <h2>Popular this Week</h2>
          {popular ? (
            popular.map((data) => (
              <div className="drink-img">
                <img src={data.strDrinkThumb}></img>
                <div>
                  <div className="name-rating">
                    <Link
                      className="drink-img-text"
                      to={`/details/${data.idDrink}`}
                      state={data}
                    >
                      {data.strDrink}
                    </Link>{" "}
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
                    {popularReviews[data.idDrink] ? (
                      <h4> {popularReviews[data.idDrink]}</h4>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p>{data.strInstructions}</p>
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
}
export default Home;
