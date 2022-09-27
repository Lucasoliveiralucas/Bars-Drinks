import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReviewItem from "../../../List/items/review-item";
import Svg from "../../../svg";
import TopBars from "./barByPrice/topbars";
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
        {barReviews ? <TopBars data={barReviews} /> : <></>}
      </div>
    </div>
  );
};
export default LoggetOut;
