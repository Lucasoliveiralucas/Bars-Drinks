import { useEffect, useState } from "react";
import ItemImg from "../../List/items/drink-item-img";
const { getPopular } = require("../../services/api");

function Home() {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    //dislays popular drinks
    const getter = async () => {
      const { drinks } = await getPopular();
      setPopular(drinks);
    };
    getter();
  }, []);
  return (
    <div className="Home">
      <div>
        <h2>Popular this Week</h2>
        <div className="drink-container-img">
          {popular ? (
            popular.map((item) => <ItemImg data={item} key={item.idDrink} />)
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
