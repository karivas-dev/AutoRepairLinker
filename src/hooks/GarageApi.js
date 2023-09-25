import { useQuery, useQueryClient , useMutation } from "react-query";
import axiosRoute from "../utils/route";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


//Garage.index
const fetchGarages = async (page) => {
    const res = await axiosRoute.get('garages.index', {page: page});
    console.log(res.data);
    return res.data;
}

const getGarages = (page) => {
    const [garages,setGarages] = useState([]);
    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['garages',page],
        queryFn: () => fetchGarages(page), 
        onError: (error) => {
            console.log(error);
        },
        onSuccess:(data) => {
            setGarages(data?.data);
        },
        refetchOnWindowFocus:false
    });
    return {data, isLoading, isError, isFetching, error , garages}

}

const fetchOneGarage = async (id) => {
    const res = await axiosRoute.get('garages.show', {garage: id})
    console.log(res.data);
    return res.data;
}

const getGarage = (id) => {
    const { data:garage, isLoading, isError, error,isFetching ,isSuccess } = useQuery({
        queryKey: ['garage'], 
        queryFn: () => fetchOneBrand(id), 
        onSuccess:(data) => {
            console.log(data.data);
        },
        onError : (error) => {
            console.log(error);
        },
        refetchOnWindowFocus:false
    });

    return { data:garage, isLoading, isError, error, isFetching , isSuccess}
}


export { getGarages , getGarage };