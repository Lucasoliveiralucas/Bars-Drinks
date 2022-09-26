const barReviewSorter = (reviews) => {
  let obj = {};
  let array = [];
  //creates object with bars as keys and having a rating array
  reviews.forEach((el) => {
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
const drinkReviewSorter = (reviews, drinkId) => {
  let obj = {};
  let retObj = {};
  //creates object with bars as keys and having a rating array
  reviews.forEach((el) => {
    obj[el.drink_id]
      ? (obj[el.drink_id] = [...obj[el.drink_id], el.rating_])
      : (obj[el.drink_id] = [el.rating_]);
  });
  //calculates average rate for each drink
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      retObj[key] =
        Math.round(obj[key].reduce((p, c) => p + c) / (2 * obj[key].length)) /
        10;
    }
  }
  return retObj;
};
module.exports = { barReviewSorter, drinkReviewSorter };
