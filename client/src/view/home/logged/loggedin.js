import { useEffect, useState } from "react";
const { userData } = require("../../../services/api");

const LoggedIn = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getter = async () => {
      const data = await userData();
      setUser(data);
    };
    getter();
  }, []);
  return <div></div>;
};

export default LoggedIn;
