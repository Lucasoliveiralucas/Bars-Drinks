const my_api = "http://localhost:3011/";
const RAPID_API_KEY = process.env.REACT_APP_RAPID_APIKEY;
const OTHER_API_KEY = process.env.REACT_APP_OTHER_KEY;
const { barReviewSorter } = require("./utils");

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
  return barReviewSorter(res);
};

const getAllReviews = async () => {
  const data = await fetch(`${my_api}allreviews/`);
  const res = await data.json();
  return barReviewSorter(res);
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

const register = (user) => {
  return fetch(`${my_api}register`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
const refreshUser = async (accessToken) => {
  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const data = await fetch(`${my_api}refresh`, options);
  const user = await data.json();
  return user;
};
const userData = async (e) => {
  const email = e;
  const accessToken = localStorage.getItem("accessToken");
  if (!email) return;
  const options = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email }),
  };
  const data = await fetch(`${my_api}home/profile`, options);
  const res = await data.json();
  return res;
};
const getCategories = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };
  return fetch(
    "https://the-cocktail-db.p.rapidapi.com/list.php?c=list",
    options
  ).then((response) => response.json());
};

const getMultipleRandom = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };

  return fetch(
    "https://the-cocktail-db.p.rapidapi.com/randomselection.php",
    options
  ).then((response) => response.json());
};
module.exports = {
  getPopular,
  getSearch,
  getBars,
  postReview,
  getReview,
  login,
  register,
  getCategories,
  getMultipleRandom,
  getAllReviews,
  userData,
  refreshUser,
};
