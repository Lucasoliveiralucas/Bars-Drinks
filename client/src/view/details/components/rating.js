import { useState } from "react";
import Bars from "./bars";

const Rating = ({ drinkId, userId }) => {
  const [rating, setRating] = useState({
    userId: null,
    drinkId: null,
    bar: null,
    score: null,
  });
  const [popUp, setPopUp] = useState(false);
  const handleSubmit = (data) => {
    data.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...rating, userId: userId, drinkId: drinkId }),
    };
    fetch("http://localhost:3010/review", options);
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
            onChange={(e) => setRating({ ...rating, bar: e.target.value })}
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
        <Bars data={rating} hook={setRating} />
      </div>
    </div>
  );
};

export default Rating;
