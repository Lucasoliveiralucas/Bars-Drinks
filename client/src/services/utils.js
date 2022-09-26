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
  //creates object with drinks ids as keys, with a nested bar object with each rating
  reviews.forEach((rev) => {
    if (!obj[rev.drink_id]) obj[rev.drink_id] = { [rev.bar]: [rev.rating_] };
    else if (!obj[rev.drink_id][rev.bar])
      obj[rev.drink_id] = { ...obj[rev.drink_id], [rev.bar]: [rev.rating_] };
    else
      obj[rev.drink_id] = {
        ...obj[rev.drink_id],
        [rev.bar]: [...obj[rev.drink_id][rev.bar], rev.rating_],
      };
  });
  //calculates average rating for each drink's bar
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      // console.log(Object.entries(obj[key]));
      Object.entries(obj[key]).forEach((el) => {
        retObj[key] = {
          ...retObj[key],
          [el[0]]:
            Math.round(el[1].reduce((p, c) => p + c) / (2 * el[1].length)) / 10,
        };
      });
    }
  }
  for (const key in retObj) {
    if (Object.hasOwnProperty.call(retObj, key)) {
      const bar = Object.entries(retObj[key]);
      const compare = (a, b) => {
        if (a[1] > b[1]) {
          return -1;
        }
        if (a[1] > b[1]) {
          return 1;
        }
        return 0;
      };
      bar.sort(compare);
      retObj[key] = bar;
    }
  }
  let resultObj = {};
  for (const key in retObj) {
    if (Object.hasOwnProperty.call(retObj, key)) {
      resultObj[key] = { bar: retObj[key][0][0], rating: retObj[key][0][1] };
    }
  }
  return resultObj;
};
module.exports = { barReviewSorter, drinkReviewSorter };
