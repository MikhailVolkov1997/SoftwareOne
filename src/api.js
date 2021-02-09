import axios from "axios";

export const api = axios.create({
  credentials: "same-origin",
  baseURL: "https://52.243.97.180:8089/servicesNS/nobody/apmTest2/api/sets",
  headers: {
    Authorization: `Basic ${Buffer.from(`oleksi:sHs7&%s5B0^5`, "utf8").toString(
      "base64"
    )}`,
  },
});

export const getAll = (url) => api.get(url);

export const getDetails = (property, name) =>
  api.get(`/${property}/entities/${name}`);
