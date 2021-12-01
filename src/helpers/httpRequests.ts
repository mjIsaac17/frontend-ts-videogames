import axios, { Method } from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export const httpRequest = (endpoint: string, method: Method, data?: any) => {
  const url = `${baseUrl}/${endpoint}`;

  return axios({ method, url, data }).catch((error) => {
    return error.response;
  });
};

export const httpRequestToken = (
  endpoint: string,
  method: Method,
  authToken: string,
  data?: any
) => {
  const url = `${baseUrl}/${endpoint}`;
  const tokenKey =
    (process.env.REACT_HEADER_AUTH_TOKEN as string) || "Authorization";
  const headers = {
    "Content-Type": "application/json",
    [tokenKey]: authToken,
  };

  return axios({ method, url, headers, data }).catch((error) => {
    return error.response;
  });
};
