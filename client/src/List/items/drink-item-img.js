import { Link } from "react-router-dom";
const ItemImg = ({ data }) => {
  return (
    <Link className="drink-img" to={`/details/${data.idDrink}`} state={data}>
      <h1 className="drink-img-text">{data.strDrink}</h1>
      <img id="img" src={data.strDrinkThumb}></img>
    </Link>
  );
};
export default ItemImg;
