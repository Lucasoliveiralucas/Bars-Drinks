import { useSelector } from "react-redux";
const { userData } = require("../../../services/api");

const LoggedIn = () => {
  const { user } = useSelector((state) => state.userDataStatus);
  const getter = async () => {
    const userReviews = await userData(user.email);
    console.log(userReviews);
  };
  getter();
  return (
    <h1 style={{ marginLeft: "5rem" }}>
      Hello <i>{user.name}</i>
    </h1>
  );
};

export default LoggedIn;
