import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export const httpPost = (endpoint: string, data?: any, authToken?: string) => {
  return axios.post(`${baseUrl}/${endpoint}`, data);
};
