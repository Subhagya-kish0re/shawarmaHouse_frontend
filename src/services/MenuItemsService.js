import axios from "axios";

const baseUrl = "http://localhost:9090/shawarmahouse/v1";

export const getAllMenuItems = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getAllMenuItems`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
