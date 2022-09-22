import BarText from "./items/bar-item";
import ItemImg from "./items/drink-item-img";
import ItemText from "./items/drink-item-text";
import ReviewItem from "./items/review-item";
const List = ({ data, type }) => {
  if (data)
    switch (type) {
      case "img": {
        return (
          <div className="drink-container-img">
            {data.map((item) => (
              <ItemImg data={item} key={item.idDrink} />
            ))}
          </div>
        );
      }
      case "item text": {
        return (
          <div className="drink-container-text">
            {data.map((item) => (
              <ItemText data={item} key={item.idDrink} />
            ))}
          </div>
        );
      }
      case "bar text": {
        return (
          <div className="drink-container-text">
            {data.map((item) => (
              <BarText data={item} key={item} />
            ))}
          </div>
        );
      }
      case "review text": {
        return (
          <div className="reviews-container">
            {data.map((item) => (
              <ReviewItem data={item} key={item} />
            ))}
          </div>
        );
      }
      default:
        return <div></div>;
    }
};
export default List;
