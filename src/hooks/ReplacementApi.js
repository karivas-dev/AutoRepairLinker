import axiosRoute from "../utils/route";
import { useState } from "react";
import { useQuery, useMutation , useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";

const fetchReplacements = async (page) => (await axiosRoute.get('replacements.index', { page: page})).data;

const getReplacements = (page) => {
    const [replacements,setReplacements] = useState([]);
    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['replacements',page],
        queryFn: () => fetchReplacements(page), 
        onError: (error) => {
            console.log(error);
        },
        onSuccess:(data) => {
            if(data?.meta?.current_page === 1){
                setReplacements(data?.data);
            }else{
                setReplacements([...replacements, ...data?.data]);
            }
        },
        refetchOnWindowFocus:false
    });
    
    return {data, isLoading, isError, isFetching, error , replacements}
}

const fetchOneReplacement =  async(id) => (await axiosRoute.get('replacements.show', id)).data;

const getReplacement = (id) => {
    const { data, isLoading, isError, error, isFetching ,isSuccess } = useQuery({
        queryKey: ['replacement'], 
        queryFn: () => fetchOneReplacement(id), 
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

const destroyReplacement = (car) => axiosRoute.delete('replacements.destroy', car.id);

const deleteReplacement = () => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: destroyReplacement,
        
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log('eliminado');
            queryClient.invalidateQueries('replacements'); 
            navigation.navigate('Home',{screen: 'ReplacementList', params: { level: 'success',  flashMessage: data?.data?.message, page: 1}});
        },
    });
}

export {getReplacements, getReplacement, deleteReplacement}