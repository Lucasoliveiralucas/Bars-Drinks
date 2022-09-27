import { useEffect, useState } from "react";
import BarComponent from "./barcomponent";

const TopBars = ({ data }) => {
  const [barsByPrice, setBarsByPrice] = useState({
    unvailable: [],
    um: [],
    dois: [],
    tres: [],
  });

  useEffect(() => {
    let sortedByPrice = { unvailable: [], um: [], dois: [], tres: [] };
    data.forEach((el) => {
      if (el.barPrice === 1 || !el.barPrice)
        sortedByPrice = {
          ...sortedByPrice,
          um: [...sortedByPrice.um, el],
        };
      if (el.barPrice === 2)
        sortedByPrice = {
          ...sortedByPrice,
          dois: [...sortedByPrice.dois, el],
        };
      if (el.barPrice === 3)
        sortedByPrice = {
          ...sortedByPrice,
          tres: [...sortedByPrice.tres, el],
        };
    });
    sortedByPrice.um = sortedByPrice.um.slice(0, 3);
    sortedByPrice.dois = sortedByPrice.dois.slice(0, 3);
    sortedByPrice.tres = sortedByPrice.tres.slice(0, 3);
    sortedByPrice.unvailable = sortedByPrice.unvailable.slice(0, 3);
    setBarsByPrice(sortedByPrice);
  }, [data]);
  return (
    <div className="bar-review">
      <h2
        style={{
          width: "10vw",
          backgroundColor: "#463F3A",
          color: "white",
          paddingTop: "3rem",
          paddingBottom: "3rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          borderRadius: "10px",
          marginRight: "2rem",
        }}
      >
        Top Rated Bars
      </h2>
      <BarComponent list={barsByPrice.um} price={1} />
      <BarComponent list={barsByPrice.dois} price={2} />
      <BarComponent list={barsByPrice.tres} price={3} />
      <h4>{data.rating}</h4>
    </div>
  );
};
export default TopBars;
