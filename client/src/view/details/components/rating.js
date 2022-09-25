import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bars from "./bars";
import Stars from "./stars/stars";
const { postReview, getReview } = require("../../../services/api");

const Rating = ({ drinkId, setReviews }) => {
  const { user } = useSelector((state) => state.userDataStatus);
  const [testBar, setTestBar] = useState(""); //should be a bar closest to written string
  const [popUp, setPopUp] = useState(false);
  const [rating, setRating] = useState({
    userId: null,
    drinkId: null,
    bar: null,
    score: null,
  });

  const handleSubmit = (data) => {
    data.preventDefault();
    data.target.reset();
    postReview({ ...rating, userId: user.id, drinkId: drinkId });
    // const res = await getReview(drinkId);
    // setReviews(res);
  };
  useEffect(() => {
    const isUserLogged = localStorage.getItem("accessToken");
    if (!isUserLogged && popUp) {
      setPopUp(false);
      alert("Please login to rate");
    }
  }, [rating.score]);
  return (
    <div>
      <h1>Rate</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="star-container">
          <Stars hook={setRating} state={rating} setPopUp={setPopUp} />
        </div>
        <div className={`rating-popup-${popUp}`}>
          <button id="close-rating" onClick={(e) => setPopUp(false)}>
            X
          </button>
          <p>Bar</p>
          <input
            type="text"
            name="bar"
            placeholder="Bar..."
            onChange={(e) => setTestBar(e.target.value)}
          ></input>
          <p>Comment</p>
          <input id="comment-input" type="text" name="comment"></input>
          <button
            id="submit-rating"
            type="submit"
            onClick={(e) => setPopUp(false)}
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        <Bars hook={setRating} data={testBar} rating={rating} />
      </div>
    </div>
  );
};

export default Rating;
