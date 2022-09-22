import { Link } from "react-router-dom";

const ItemText = ({ data }) => {
  return (
    <div className="drink-text">
      <Link to={`/details/${data.idDrink}`} state={data}>
        <h4>{data.strDrink}</h4>
      </Link>
    </div>
  );
};
export default ItemText;
