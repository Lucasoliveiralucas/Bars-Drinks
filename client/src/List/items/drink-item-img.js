import { Link } from "react-router-dom";
const ItemImg = ({ data }) => {
  console.log(data);
  return (
    <div className="drink-img">
      <img src={data.strDrinkThumb}></img>
      <div>
        <Link
          className="drink-img-text"
          to={`/details/${data.idDrink}`}
          state={data}
        >
          {data.strDrink}
        </Link>
        <p>{data.strInstructions}</p>
      </div>
    </div>
  );
};
export default ItemImg;
