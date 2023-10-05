import axiosRoute from "../utils/route";
import { useEffect, useState } from "react";
import { useQuery, useMutation , useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";

let brandData = null;
const getBrand=({id})=> {

    const [brand, setBrand] = useState(brandData);

    useEffect( () => {
        
        async function fetchData() {
            if(brand == null){
                const data = await fetchBrand(id);
                setBrand(data);
                brandData = data;
            }
        }
        fetchData();

    },[id]);
        return brand;
    }



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


const storeReplacement = (replacement) => (axiosRoute.post('replacements.store', null, replacement));

const updateReplacement = (replacement) => (axiosRoute.put('replacements.update', replacement.id, replacement));

const createEditReplacement = (formikErrors, replacement) => {

    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    const createEditReplacementMutation = useMutation({
        mutationFn: (replacement.id == '' ?  storeReplacement : updateReplacement),

        onError: (error, variables) => {
            formikErrors(error.response.data.errors);
        },
        onSuccess: (data, variables) => {
            console.log('guardado');
            queryClient.invalidateQueries('replacements');
            navigation.navigate('ReplacementList', { level: 'success',  flashMessage: data?.data?.message, page: 1});

},
    });

    return createEditReplacementMutation;
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
            navigation.navigate('ReplacementList', { level: 'success',  flashMessage: data?.data?.message, page: 1});
        },
    });
}

export {getReplacements, getReplacement, deleteReplacement, createEditReplacement, getBrand}