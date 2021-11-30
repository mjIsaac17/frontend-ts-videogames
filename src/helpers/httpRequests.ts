import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export const httpPost = (endpoint: string, data?: any, authToken?: string) => {
  const url = `${baseUrl}/${endpoint}`;
  return axios.post(url, data).catch((error) => {
    return error.response;
  });
};
