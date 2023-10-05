import axiosRoute from "../utils/route";
import { useState } from "react";
import { useQuery, useMutation , useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";

const fetchStores = async (page) => {
    const res = await axiosRoute.get('stores.index', {page: page});
    console.log(res.data);
    return res.data;
}

const getStores = (page) => {
    const [stores,setStores] = useState([]);
    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['stores',page],
        queryFn: () => fetchStores(page), 
        onError: (error) => {
            console.log(error);
        },
        onSuccess:(data) => {
            console.log(data?.meta?.current_page);
            if(data?.meta?.current_page === 1){
                setStores(data?.data);
            }else{
                setStores([...stores, ...data?.data]);
            }
        },
        refetchOnWindowFocus:false
    });
    
    return {data, isLoading, isError, isFetching, error , stores}
}

const fetchOneStore = async(id) => {
    const res = await axiosRoute.get('stores.show', id)
    console.log(res.data);
    return res.data;
}

const getStore = (id) => {
    const { data, isLoading, isError, error,isFetching ,isSuccess } = useQuery({
        queryKey: ['owner'], 
        queryFn: () => fetchOneStore(id), 
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


const storeStoreXd = (store) => (axiosRoute.post('stores.store', null, store));

const updateStore = (store) => (axiosRoute.put('stores.update', store.id, store));

//store CREATE - UPDATE 
const createEditStore = (store) => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    const createEditStoreMutation = useMutation({
        mutationFn: (store.id == '' ?  storeStoreXd : updateStore),
        
        onError: (error, variables) => {
            console.log(error);
        },
        onSuccess: (data, variables) => {
            console.log('guardado');
            queryClient.invalidateQueries(['stores',1]);      
            navigation.navigate('StoresList',{ level: 'success',  flashMessage: data?.data?.message , page: 1}); 
            //navigation.navigate('BrandList',{ level: 'success', flashMessage: data?.data?.message }); asi en un futuro
        },
    });
    return createEditStoreMutation;
}

const destroyStore = (store) => axiosRoute.delete('stores.destroy', store.id);

const deleteStore = () => {

    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    const deleteStoreMutation = useMutation({
        mutationFn: destroyStore,
        
        onError: (error) => {
            console.log(error.response.data.message);
        },
        onSuccess: (data) => {
            console.log('eliminado');
            queryClient.invalidateQueries(['stores',1]); 
            navigation.navigate('StoresList',{ level: 'success',  flashMessage: data?.data?.message, page: 1}); 
            //navigation.navigate('BrandList',{ level: 'success', flashMessage: data?.data?.message }); asi en un futuro
        },
    });
    return deleteStoreMutation;
}

export {getStores , getStore, createEditStore ,deleteStore};