import { useState } from "react";
import Bars from "./bars";
const { postReview } = require("../../../services/api");

const Rating = ({ drinkId, userId }) => {
  const [rating, setRating] = useState({
    userId: null,
    drinkId: null,
    bar: null,
    score: null,
  });
  const [testBar, setTestBar] = useState(""); //should be a bar closest to written string
  const [popUp, setPopUp] = useState(false);
  const handleSubmit = (data) => {
    data.preventDefault();
    data.target.reset();
    postReview({ ...rating, userId: userId, drinkId: drinkId });
  };
  return (
    <div>
      <h1>Rate</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="range"
          min={0}
          max={100}
          name="score"
          placeholder="Score"
          onChange={(e) => setRating({ ...rating, score: e.target.value })}
          onClick={(e) => setPopUp(true)}
        ></input>
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
