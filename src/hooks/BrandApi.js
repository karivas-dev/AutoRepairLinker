import axios from "axios";
import { useQuery,useInfiniteQuery } from "react-query";
import { getAuthToken } from "../context/AuthContext";


const brandApi = axios.create({baseURL: 'http://127.0.0.1:8000/api/v1'})

brandApi.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const fetchBrands = async (page) => {
    const res = await brandApi.get(`/brands?page=${page}` );
    console.log(res.data);
    return res.data;
}

const fetchOneBrand = async (id) => {
    const res = await brandApi.get(`/brands/${id}`);
    console.log(res.data);
    return res.data;
}

const storeBrand = (brand) => (brandApi.post('/brands',brand));

const updateBrand = (brand) => (brandApi.put(`/brands/${brand.id}`, brand));

export {fetchBrands , fetchOneBrand , storeBrand , updateBrand};