import axios from "axios";

export const getUsersList = async () => {
  return await axios.get(`http://127.0.0.1:4449/users`);
};
