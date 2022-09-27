const my_api = process.env.REACT_APP_MY_API;
const RAPID_API_KEY = process.env.REACT_APP_RAPID_APIKEY;
const OTHER_API_KEY = process.env.REACT_APP_OTHER_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const { barReviewSorter, drinkReviewSorter } = require("./utils");

const getPopular = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    };
    const data = await fetch(
      "https://the-cocktail-db.p.rapidapi.com/popular.php",
      options
    );
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getSearch = async (drink) => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    };

    const data = await fetch(
      `https://the-cocktail-db.p.rapidapi.com/search.php?s=${drink}`,
      options
    );
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getBars = async () => {
  try {
    const data = await fetch(
      `https://api.tomtom.com/search/2/nearbySearch/.json?lat=41.390&lon=2.154&limit=100&radius=6000&categorySet=9379004&view=Unified&relatedPois=off&key=${OTHER_API_KEY}`
    );
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const postReview = async (rating) => {
  try {
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
    const data = await fetch(`${my_api}review`, options);
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getReview = async (drinkId) => {
  try {
    const data = await fetch(`${my_api}review/${drinkId}`);
    const res = await data.json();
    return barReviewSorter(res);
  } catch (error) {
    console.log(error);
  }
};

const getAllReviews = async (drinkData) => {
  try {
    const data = await fetch(`${my_api}allreviews/`);
    const res = await data.json();
    const barReviews = barReviewSorter(res);
    const drinkReviews = drinkReviewSorter(res, drinkData);
    return { bars: barReviews, drinks: drinkReviews };
  } catch (error) {
    console.log(error);
  }
};

const login = async (user) => {
  try {
    const data = await fetch(`${my_api}login`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const register = async (user) => {
  try {
    const data = await fetch(`${my_api}register`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};
const refreshUser = async (accessToken) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
const userData = async (e) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
const getCategories = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    };
    const data = await fetch(
      "https://the-cocktail-db.p.rapidapi.com/list.php?c=list",
      options
    );
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getMultipleRandom = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    };

    const data = await fetch(
      "https://the-cocktail-db.p.rapidapi.com/randomselection.php",
      options
    );
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};
const testGoogleAPI = async () => {
  try {
    const data = await fetch(my_api + "bars");
    const res = await data.json();
    return JSON.parse(res);
  } catch (error) {
    console.log(error);
  }
};
const getPhotos = async (barData) => {
  try {
    let photoId = [];
    barData.forEach((element) => {
      photoId.push(element.barImage);
    });
    const data = await fetch(my_api + "photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photoId),
    });
    const res = await data.json(photoId);
    return JSON.parse(res);
  } catch (error) {
    console.log(error);
  }
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
  testGoogleAPI,
  getPhotos,
};
