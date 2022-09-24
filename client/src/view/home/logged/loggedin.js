import { useSelector } from "react-redux";
const { userData } = require("../../../services/api");

const LoggedIn = () => {
  const { user } = useSelector((state) => state.userDataStatus);
  const getter = async () => {
    const userReviews = await userData(user.email);
    console.log(userReviews);
  };
  getter();
  return <div>hello {user.name}</div>;
};

export default LoggedIn;
