import { useEffect, useState } from "react";

//for now it only shows bars and let users choose bars that do not exist
//need to fix it
const Bars = ({ data, hook, rating }) => {
  const [bars, setBar] = useState([]);
  const [barList, setList] = useState([]);
  const { getBars } = require("../../../services/api");

  useEffect(() => {
    // data from api
    const getter = async () => {
      const { results } = await getBars();
      setBar(results);
    };
    getter();
  }, []);

  useEffect(() => {
    //display closest matches
    let buffer = [];
    if (data) {
      bars.map((bar) => {
        if (bar.poi.name.toLowerCase().includes(data.toLowerCase()))
          buffer = [...buffer, bar.poi.name];
      });
      console.log(buffer[0]);
      if (data.length < 2) buffer = [];
      if (buffer[0]) hook({ ...rating, bar: buffer[0] });
      else hook({ ...rating, bar: null });
      setList(buffer);
    } else setList([]);
  }, [data]);

  return (
    <div className="drink-container-text">
      {barList ? (
        barList.map((item) => (
          <div className="drink-text" key={item}>
            <h4>{item}</h4>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default Bars;
