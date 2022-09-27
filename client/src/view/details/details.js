import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Svg from "../../svg";
import Rating from "./components/rating";
const { getReview, getPhotos } = require("../../services/api");
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
      const photos = await getPhotos(data);
    };
    getter();
  }, [drink]);

  return (
    <div
      className="details-container"
      style={{ marginTop: "5rem", alignItems: "center" }}
    >
      <div className="details-body">
        <div style={{ marginLeft: "2rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ margin: "0" }}>{drink.strDrink}</h1>
            <h3>{reviews[0] ? <i>Best at {reviews[0].bar}</i> : <></>}</h3>
          </div>
          <h4
            style={{
              textAlign: "center",
              marginRight: "10rem",
              marginBottom: "1.5rem",
            }}
          >
            <i>
              Want to know what goes in this drink?<br></br>Here's the classic
              recipe
            </i>
          </h4>
          <div style={{ display: "flex", marginBottom: "4rem" }}>
            <img
              src={drink.strDrinkThumb}
              className="details-img"
              style={{ height: "10rem" }}
            ></img>
            <div style={{ marginLeft: "2rem" }}>
              <h3 style={{ marginTop: "0" }}>Ingredients</h3>
              {ingredients.map((item) => (
                <li>
                  {item.ingredient} - {item.measure}
                </li>
              ))}
              <h3>{drink.strInstructions}</h3>
            </div>
          </div>
        </div>
        <div className="details-text">
          <Rating drinkId={drink.idDrink} setReviews={setReviews} />
          <div className="details-ingredients">
            {reviews.map((item) => (
              <div>
                <h4>{item.bar}</h4>
                <Svg />
                <h4>{item.rating}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="reviews-container"
        style={{
          borderTop: "dotted",
          justifyContent: "space-between",
          paddingTop: "1.5rem",
        }}
      >
        <div
          className="comments-container"
          style={{
            backgroundColor: "#BCB8B1",
            borderRadius: "10px",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            minWidth: "20rem",
          }}
        >
          <h2 style={{ color: "#F4F3EE" }}>
            <i>Comments...</i>
          </h2>
          {reviews.map((item) =>
            item.comments ? (
              <div
                style={{
                  backgroundColor: "#F4F3EE",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                <p style={{ padding: "0.5rem", color: "#BCB8B1" }}>
                  <b>
                    <i>anonymus</i>
                  </b>{" "}
                  at <b>{item.bar}</b>
                </p>
                <h4
                  style={{
                    marginBottom: "3rem",
                    paddingBottom: "0.5rem",
                    color: "#8A817C",
                  }}
                >
                  {item.comments}
                </h4>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
        <div>
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
      </div>
    </div>
  );
};
export default Details;
