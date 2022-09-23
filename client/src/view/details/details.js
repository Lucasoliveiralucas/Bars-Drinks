import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReviewItem from "../../List/items/review-item";
import Rating from "./components/rating";
const getReview = require("./utils");
const Details = () => {
  // const { id } = useParams();
  const [drink, setDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const { state } = useLocation();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setDrink(state);
  }, [state]);

  useEffect(() => {
    //Ingredients List
    const key = Object.keys(drink);
    let count1;
    let count2;
    key.forEach((el, index) => {
      if (el === "strIngredient1") count1 = index;
      if (el === "strMeasure1") {
        count2 = index;
        return;
      }
    });
    let arr = [];
    while (drink[key[count1]]) {
      arr = [
        ...arr,
        { ingredient: drink[key[count1]], measure: drink[key[count2]] },
      ];
      count1++;
      count2++;
    }
    setIngredients(arr);
    //Getting reviews
    const getter = async () => {
      const data = await getReview(drink.idDrink);
      setReviews(data);
    };
    getter();
  }, [drink]);

  return (
    <div className="details-container">
      <div className="details-header">
        <h1>{drink.strDrink}</h1>
        <Rating drinkId={drink.idDrink} userId={1} />
      </div>
      <div className="details-body">
        <img src={drink.strDrinkThumb} className="details-img"></img>
        <div className="details-text">
          <div className="details-ingredients">
            <div className="details-content">
              <h2>Ingredients</h2>
              {ingredients.map((item) => (
                <li>
                  {item.ingredient} {item.measure}
                </li>
              ))}
            </div>
            {drink.strVideo ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${drink.strVideo.substring(
                  32
                )}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            ) : (
              <p></p>
            )}
          </div>
          <h3>{drink.strInstructions}</h3>
        </div>
      </div>
      <div className="reviews-container">
        {reviews.map((item) => (
          <ReviewItem data={item} key={item} />
        ))}
      </div>
    </div>
  );
};
export default Details;
