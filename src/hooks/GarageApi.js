import { useQuery, useQueryClient , useMutation } from "react-query";
import axiosRoute from "../utils/route";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

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
        queryFn: () => fetchOneGarage(id), 
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

const storeGarage = (garage) => (axiosRoute.post('garages.store', null, garage));

const updateGarage = (garage) => (axiosRoute.put('garages.update', garage.id, garage));
 
const createEditGarage = (garage) => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    const createEditGarageMutation = useMutation({
        mutationFn: (garage.id == '' ?  storeGarage : updateGarage),
        
        onError: (error, variables) => {
            console.log(error);
        },
        onSuccess: (data, variables) => {
            console.log('guardado');
            queryClient.invalidateQueries(['garages',1]);
            navigation.navigate('Home',{screen: 'GarageList', params: { level: 'success', flashMessage: data?.data?.message }}); 
        },
    });
    return createEditGarageMutation;
}


const destroyGarage = (garage) => axiosRoute.delete('garages.destroy', garage.id);

const deleteGarage = () => {
    
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    const deleteGarageMutation = useMutation({
        mutationFn: destroyGarage,
        
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log('eliminado');
            queryClient.invalidateQueries(['garages',1]); 
            navigation.navigate('Home',{screen: 'GarageList', params: { level: 'success',  flashMessage: 'El garage se elimino correctamente.' }}); 
        },
    });
    return deleteGarageMutation;
}


export { getGarages , getGarage, createEditGarage, deleteGarage };