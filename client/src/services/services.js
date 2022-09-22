const getPopular = () => {
  let result;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "97323259c3mshb808de60331839cp13854cjsnee8ba1559688",
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };

  fetch("https://the-cocktail-db.p.rapidapi.com/popular.php", options)
    .then((response) => response.json())
    .then((response) => (result = response))
    .catch((err) => console.error(err));
  console.log(result);
  return result;
};

module.exports = { getPopular };
