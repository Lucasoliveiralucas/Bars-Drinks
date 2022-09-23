import Login from "./login/login";
import SearchBar from "./searchBar/searchBar";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <div>
        <SearchBar />
      </div>
      <Login props={props} />
    </div>
  );
};

export default Header;
