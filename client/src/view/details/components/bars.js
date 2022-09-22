import { useEffect, useState } from "react";
import List from "../../../List/list";

//for now it only shows bars and let users choose bars that do not exist
//need to fix it
const Bars = ({ data, hook }) => {
  const [bars, setBar] = useState([]);
  const [barList, setList] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.tomtom.com/search/2/nearbySearch/.json?lat=41.390&lon=2.154&limit=100&radius=6000&categorySet=9379004&view=Unified&relatedPois=off&key=QbzgAUTUhhn7YdPuVX2l4nFur8n0kPbv`
    )
      .then((response) => response.json())
      .then((response) => {
        if (data.bar) {
          setBar(response.results);
        }
      })
      .catch((err) => console.error(err));
    if (data.bar) {
      let buffer = [];
      bars.map((bar) => {
        if (bar.poi.name.toLowerCase().includes(data.bar.toLowerCase()))
          buffer = [...buffer, bar.poi.name];
      });
      setList(buffer);
    } else setList([]);
    // hook({ ...data, bar: barList });
  }, [data.bar]);

  return (
    <div>
      <List data={barList} type="bar text" />
    </div>
  );
};
export default Bars;
