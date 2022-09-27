const barReviewSorter = (reviews) => {
  let obj = {};
  let array = [];
  //creates object with bars as keys and having a rating array
  reviews.forEach((el) => {
    obj[el.bar]
      ? (obj[el.bar] = {
          ...obj[el.bar],
          rating: [...obj[el.bar].rating, el.rating_],
        })
      : (obj[el.bar] = {
          barImage: el.bar_image,
          barPrice: el.bar_price,
          rating: [el.rating_],
          comments: el.user_comment,
        });
  });
  //formating object for easier operations
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      array = [
        ...array,
        {
          bar: key,
          rating: obj[key].rating,
          barImage: obj[key].barImage,
          barPrice: obj[key].barPrice,
          comments: obj[key].comments,
        },
      ];
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
  //creates object with drinks ids as keys, with a nested bar object with each rating(also has comments because of mistake)
  reviews.forEach((rev) => {
    if (!obj[rev.drink_id])
      obj[rev.drink_id] = {
        [rev.bar]: {
          rating: [rev.rating_],
          comment: [rev.user_comment],
        },
      };
    else if (!obj[rev.drink_id][rev.bar])
      obj[rev.drink_id] = {
        ...obj[rev.drink_id],
        [rev.bar]: { rating: [rev.rating_], comment: [rev.user_comment] },
      };
    else
      obj[rev.drink_id] = {
        ...obj[rev.drink_id],
        [rev.bar]: {
          rating: [...obj[rev.drink_id][rev.bar].rating, rev.rating_],
          comment: [...obj[rev.drink_id][rev.bar].comment, rev.user_comment],
        },
      };
  });
  //calculates average rating for each drink's bar
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      // console.log(Object.entries(obj[key]));
      Object.entries(obj[key]).forEach((el) => {
        retObj[key] = {
          ...retObj[key],
          [el[0]]: {
            rating:
              Math.round(
                el[1].rating.reduce((p, c) => p + c) / (2 * el[1].rating.length)
              ) / 10,
            comment: el[1].comment,
          },
        };
      });
    }
  }
  for (const key in retObj) {
    if (Object.hasOwnProperty.call(retObj, key)) {
      const bar = Object.entries(retObj[key]);
      const compare = (a, b) => {
        if (a[1].rating > b[1].rating) {
          return -1;
        }
        if (a[1].rating > b[1].rating) {
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
      resultObj[key] = {
        bar: retObj[key][0][0],
        rating: retObj[key][0][1].rating,
        comment: retObj[key][0][1].comment,
      };
    }
  }
  return resultObj;
};
module.exports = { barReviewSorter, drinkReviewSorter };
