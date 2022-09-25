import { useEffect } from "react";
import "./stars.css";
const Stars = ({ hook, state, setPopUp }) => {
  const stars = document.querySelectorAll(".star");
  const defaultRatingIndex = 0;
  let currentRatingIndex = 0;

  const setRating = (index) => {
    stars.forEach((star) => star.classList.remove("selected"));
    if (index > 0 && index <= stars.length) {
      document
        .querySelector('[data-rate="' + index + '"]')
        .classList.add("selected");
      hook({ ...state, score: index * 20 });
      const isUserLogged = localStorage.getItem("accessToken");
      isUserLogged ? setPopUp(true) : alert("Please login to rate");
    }
  };
  const checkSelectedStar = (star) => {
    if (parseInt(star.getAttribute("data-rate")) === currentRatingIndex) {
      return true;
    } else {
      return false;
    }
  };
  const resetRating = () => {
    currentRatingIndex = defaultRatingIndex;
    setRating(defaultRatingIndex);
  };

  useEffect(() => {
    stars.forEach((star) => {
      star.addEventListener("click", function () {
        if (checkSelectedStar(star)) {
          resetRating();
          return;
        }
        console.log("here a bunch of times");
        const index = parseInt(star.getAttribute("data-rate"));
        currentRatingIndex = index;
      });
    });
    document.addEventListener("DOMContentLoaded", function () {
      setRating(defaultRatingIndex);
    });
  }, []);
  return (
    <div className="stars">
      <div className="star" data-rate="5" onClick={(e) => setRating(5)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-star"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <div className="star" data-rate="4" onClick={(e) => setRating(4)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-star"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <div className="star" data-rate="3" onClick={(e) => setRating(3)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-star"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <div className="star" data-rate="2" onClick={(e) => setRating(2)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-star"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <div className="star" data-rate="1" onClick={(e) => setRating(1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-star"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
    </div>
  );
};
export default Stars;
