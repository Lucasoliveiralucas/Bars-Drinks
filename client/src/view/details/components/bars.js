import { useEffect, useState } from "react";

//for now it only shows bars and let users choose bars that do not exist
//need to fix it
const Bars = ({ data, hook, rating }) => {
  const [bars, setBar] = useState([]);
  const [barList, setList] = useState([]);

  useEffect(() => {
    // data from api
    fetch(
      `https://api.tomtom.com/search/2/nearbySearch/.json?lat=41.390&lon=2.154&limit=100&radius=6000&categorySet=9379004&view=Unified&relatedPois=off&key=QbzgAUTUhhn7YdPuVX2l4nFur8n0kPbv`
    )
      .then((response) => response.json())
      .then((response) => {
        setBar(response.results);
      })
      .catch((err) => console.error(err));
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
