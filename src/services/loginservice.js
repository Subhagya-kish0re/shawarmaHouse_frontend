import axios from "axios";

const baseUrl = "http://localhost:9090/shawarmahouse/v1";

const createUser = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/createUser`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserByName = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/user/${name}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginservice = {
  createUser,
  getUserByName,
};

export default loginservice;
