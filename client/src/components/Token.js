import { useSelector } from "react-redux";

const Token = () => {
  const token = useSelector((state) => state.login.token);
  return token;
};

export default Token;
