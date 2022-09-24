import { useSelector } from "react-redux";
const { userData } = require("../../../services/api");

const LoggedIn = () => {
  const { user } = useSelector((state) => state.userDataStatus);
  userData(user.email);
  return <div>hello {user.name}</div>;
};

export default LoggedIn;
