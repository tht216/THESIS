import axios from "axios";
import request from "../Utils/request";

const URL = "http://localhost:3000/api/v1";

const loginService = (payload) => {
  return request.post("http://localhost:3000/api/v1/auth/login/", payload);
};

export { loginService };
