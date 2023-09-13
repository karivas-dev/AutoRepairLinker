import axios from "axios";
import { useQuery } from "react-query";

const ownerApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

const getOwners = async () => {
    const res = await ownerApi.get('/owners');
    return res.data.owners;
}

export {getOwners};