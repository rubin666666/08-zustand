import axios from "axios";

export const notehubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});
