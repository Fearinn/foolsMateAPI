import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "https://api.wolvesville.com/",
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

export default instance;
