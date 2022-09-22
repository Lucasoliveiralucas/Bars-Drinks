const getReview = async (drinkId) => {
  const data = await fetch(`http://localhost:3010/review/${drinkId}`);
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

module.exports = getReview;
