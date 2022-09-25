import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stars from "./stars/stars";
const { postReview, getReview, getBars } = require("../../../services/api");

const Rating = ({ drinkId, setReviews }) => {
  const { user } = useSelector((state) => state.userDataStatus);
  const [bars, setBar] = useState([]);
  const [barList, setBarList] = useState([]);
  const [writtenBar, setwrittenBar] = useState(""); //should be a bar closest to written string
  const { getBars } = require("../../../services/api");
  const [popUp, setPopUp] = useState(false);
  const [rating, setRating] = useState({
    userId: null,
    drinkId: null,
    bar: null,
    score: null,
  });

  const handleSubmit = async (data) => {
    data.preventDefault();
    data.target.reset();
    await postReview({ ...rating, userId: user.id, drinkId: drinkId });
    const res = await getReview(drinkId);
    setReviews(res);
    setwrittenBar("");
  };
  useEffect(() => {
    const isUserLogged = localStorage.getItem("accessToken");
    if (!isUserLogged && popUp) {
      setPopUp(false);
      alert("Please login to rate");
    }
  }, [rating.score]);
  useEffect(() => {
    //display closest matches
    let buffer = [];
    if (writtenBar) {
      bars.map((bar) => {
        if (bar.poi.name.toLowerCase().includes(writtenBar.toLowerCase()))
          buffer = [...buffer, bar.poi.name];
      });
      if (writtenBar.length < 2) buffer = [];
      if (buffer[0]) setRating({ ...rating, bar: buffer[0] });
      else setRating({ ...rating, bar: null });
      setBarList(buffer);
    } else setBarList([]);
  }, [writtenBar]);
  useEffect(() => {
    // data from api
    const getter = async () => {
      const { results } = await getBars();
      setBar(results);
    };
    getter();
  }, []);
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
            onChange={(e) => setwrittenBar(e.target.value)}
            value={writtenBar}
          ></input>
          <div className="drink-container-text">
            {barList ? (
              barList.map((item) => (
                <div className="drink-text" key={item}>
                  <h4 onClick={(e) => setwrittenBar(item)}>{item}</h4>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <p>Comment</p>
          <input
            id="comment-input"
            type="text"
            name="comment"
            placeholder="Write a comment..."
          ></input>
          <button
            id="submit-rating"
            type="submit"
            onClick={(e) => setPopUp(false)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Rating;
