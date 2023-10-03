import axiosRoute from "../utils/route";
import { useState } from "react";
import { useQuery, useMutation , useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";

const fetchGarages = async (page,garageId) => (await axiosRoute.get('garages.index', { garage:garageId , page: page})).data;

const fethcOneGarage =  async(id) => (await axiosRoute.get('garages.show', id)).data;

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

const getGarage = (id) => {
    const { data, isLoading, isError, error,isFetching ,isSuccess } = useQuery({
        queryKey: ['garage'], 
        queryFn: () => fethcOneGarage(id), 
        onSuccess:(data) => {
            console.log(data.data);
        },
        onError : (error) => {
            console.log(error);
        },
        refetchOnWindowFocus:false
    });

    return { data, isLoading, isError, error, isFetching , isSuccess}
}

const storeGarage = (garage) => (axiosRoute.post('garages.store', null, garage),console.log(garage));

const updateGarage = (garage) => (axiosRoute.patch('garages.update', garage.id, garage));

const createEditGarage = (formikErrors, garage) => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();
    return useMutation({
        mutationFn: (garage.id == '' ?  storeGarage : updateGarage),
        
        onError: (error) => {
            formikErrors(error.response.data.errors);
        },
        onSuccess: (data) => {
            console.log('guardado');
            queryClient.invalidateQueries('garages');     
            navigation.navigate('Home',{screen: 'GarageList', params: { level: 'success', flashMessage: data?.data?.message }});  
        },
    });
}

const destroyGarage = (garage) => axiosRoute.delete('garages.destroy', garage.id);

const deleteGarage = () => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
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
}
export {getGarages ,getGarage ,createEditGarage, deleteGarage}