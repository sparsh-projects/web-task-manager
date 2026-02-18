import api from "./client";

export const parseTask = async (input) => {
  const res = await api.post("/ai/parse", { input });
  return res.data;
};