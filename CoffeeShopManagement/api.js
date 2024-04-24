import axios from "axios";

const api = axios.create({
    baseURL: "https://cfbe.up.railway.app/",
});

export const getRoleByUsername = async (username) => {
    try {
        const response = await api.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
