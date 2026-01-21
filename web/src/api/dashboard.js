import api from "./client";

// Get dashboard data
export const getDashboard = async (range) => {
    const res = await api.get(`/dashboard?range=${range}`);
    return res.data;
};