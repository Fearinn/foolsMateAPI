import axios, { AxiosError } from "axios";

export const instance = axios.create({
  baseURL: "https://api.wolvesville.com/",
  timeout: 30000,
});

instance.interceptors.request.use(
  (config) => {
    if (process.env["KEY"]) {
      config.headers.Authorization = `Bot ${process.env["KEY"]}`;
      config.headers["Content-Type"] = "application/json";
      config.headers.Accept = "application/json";
    }
    return config;
  },
  (error: AxiosError) => {
    throw new Error(error.message);
  }
);