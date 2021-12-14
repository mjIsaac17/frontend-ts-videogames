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
  queryParams?: Object,
  data?: any
) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const url = `${baseUrl}/${endpoint}`;
  const tokenKey =
    (process.env.REACT_HEADER_AUTH_TOKEN as string) || "Authorization";
  const headers = {
    [tokenKey]: authToken,
  };

  return axios({
    method,
    url,
    headers,
    data: formData,
    params: queryParams,
  }).catch((error) => {
    return error.response;
  });
};
