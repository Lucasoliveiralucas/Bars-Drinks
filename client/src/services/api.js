const my_api = "http://localhost:3011/";
const RAPID_API_KEY = process.env.REACT_APP_RAPID_APIKEY;
const OTHER_API_KEY = process.env.REACT_APP_OTHER_KEY;
const getPopular = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };
  return fetch("https://the-cocktail-db.p.rapidapi.com/popular.php", options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

const getSearch = (drink) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };

  return fetch(
    `https://the-cocktail-db.p.rapidapi.com/search.php?s=${drink}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
const getBars = () => {
  return fetch(
    `https://api.tomtom.com/search/2/nearbySearch/.json?lat=41.390&lon=2.154&limit=100&radius=6000&categorySet=9379004&view=Unified&relatedPois=off&key=${OTHER_API_KEY}`
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

const postReview = (rating) => {
  const accessToken = localStorage.getItem("accessToken");
  const options = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(rating),
  };
  return fetch(`${my_api}review`, options);
};

const getReview = async (drinkId) => {
  const data = await fetch(`${my_api}review/${drinkId}`);
  const res = await data.json();
  let obj = {};
  let array = [];
  //
  //creates object with bars as keys and having a rating array
  res.forEach((el) => {
    obj[el.bar]
      ? (obj[el.bar] = [...obj[el.bar], el.rating_])
      : (obj[el.bar] = [el.rating_]);
  });
  //formating object for easier operations
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      array = [...array, { bar: key, rating: obj[key] }];
    }
  }
  array.map((el, i) => {
    return (array[i].rating =
      Math.round(el.rating.reduce((p, c) => p + c) / (2 * el.rating.length)) /
      10);
  });
  function compare(a, b) {
    if (a.rating > b.rating) {
      return -1;
    }
    if (a.rating < b.rating) {
      return 1;
    }
    return 0;
  }
  array.sort(compare);
  return array;
};
const login = (user) => {
  return fetch(`${my_api}login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
module.exports = {
  getPopular,
  getSearch,
  getBars,
  postReview,
  getReview,
  login,
};
