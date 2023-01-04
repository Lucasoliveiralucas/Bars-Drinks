import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stars from "./stars/stars";
import { postReview, getReview, testGoogleAPI } from "../../../services/api";

const Rating = ({ drinkId, setReviews }) => {
  const { user } = useSelector((state) => state.userDataStatus);
  const [bars, setBar] = useState([]);
  const [barList, setBarList] = useState([]);
  const [writtenBar, setwrittenBar] = useState(""); //should be a bar closest to written string
  const [popUp, setPopUp] = useState(false);
  const [rating, setRating] = useState({
    userId: null,
    drinkId: null,
    barName: null,
    barPrice: null,
    barImage: null,
    comment: null,
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
      if (bars) {
        bars.map((bar) => {
          if (bar.name.toLowerCase().includes(writtenBar.toLowerCase())) {
            buffer = [...buffer, bar];
          }
        });
      }
      if (writtenBar.length < 2) buffer = [];
      if (buffer[0])
        setRating({
          ...rating,
          barName: buffer[0].name,
          barPrice: buffer[0].price_level,
          barImage: buffer[0].photos[0].photo_reference,
        });
      else
        setRating({ ...rating, barName: null, barPrice: null, barImage: null });
    } else setBarList([]);
    let barListHolder = [];
    buffer.forEach((el) => {
      barListHolder = [...barListHolder, el.name];
    });
    setBarList(barListHolder);
  }, [writtenBar]);
  useEffect(() => {
    // data from api
    const getter = async () => {
      const results = await testGoogleAPI();
      setBar(results);
    };
    getter();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ textAlign: "center", marginBottom: "0" }}>
        Had this drink somewhere?
      </h2>
      <div
        style={{
          padding: "2rem",
          paddingTop: "1rem",
          borderRadius: "10px",
          justifyContent: "center",
          verticalAlign: "middle",
          display: "inline-flex",
          marginTop: "0",
        }}
      >
        <h2 style={{ marginTop: "0" }}>Rate:</h2>
        <form onSubmit={(e) => handleSubmit(e)} style={{ marginLeft: "2rem" }}>
          <Stars hook={setRating} state={rating} setPopUp={setPopUp} />

          <div className={`rating-popup-${popUp}`}>
            <button id="close-rating" onClick={(e) => setPopUp(false)}>
              X
            </button>
            <p style={{ marginLeft: "0" }}>Bar</p>
            <input
              autoComplete="off"
              type="text"
              name="bar"
              placeholder="Bar..."
              onChange={(e) => setwrittenBar(e.target.value)}
              value={writtenBar}
            ></input>
            <div
              className="drink-container-text"
              style={{ marginLeft: "2.6rem", width: "24.2vw" }}
            >
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
            <div style={{ display: "block" }}>
              <input
                autoComplete="off"
                id="comment-input"
                type="textarea"
                name="comment"
                placeholder="Write a comment..."
                onChange={(e) =>
                  setRating({ ...rating, comment: e.target.value })
                }
              ></input>
              <h1></h1>
              <button
                style={{
                  backgroundColor: "#BCB8B1",
                  fontSize: "1rem",
                  padding: "0.5rem",
                  color: "#463F3A",
                  borderRadius: "10px",
                  float: "right",
                  marginRight: "2.1rem",
                }}
                type="submit"
                onClick={(e) => setPopUp(false)}
              >
                <b>Submit</b>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rating;
