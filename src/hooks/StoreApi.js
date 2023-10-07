import axiosRoute from "../utils/route";
import { useState } from "react";
import { useQuery, useMutation , useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { createEditBranch } from "./BranchApi";

const fetchStores  = async (page) => (await axiosRoute.get('stores.index', { page: page})).data;

const getStores = (page) => {
    const [stores,setStores] = useState([]);
    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['stores',page],
        queryFn: () => fetchStores(page), 
        onError: (error) => {
            console.log(error);
        },
        onSuccess:(data) => {
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

const fetchOneStore = async (id) => (await axiosRoute.get('stores.show', {store: id})).data;

const getStore = (id) => {
    const { data, isLoading, isError, error,isFetching ,isSuccess } = useQuery({
        queryKey: ['store'], 
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

//branch store
const storeBranch = (branch) => (axiosRoute.post('branches.store', null, branch),console.log(branch));

const updateBranch = (branch) => (axiosRoute.patch('branches.update', branch.id, branch));

const createEditStore = (formikErrors, store) => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    const createEditStoreMutation = useMutation({
        mutationFn: (store.id == '' ?  storeStoreXd : updateStore),
        
        onError: (error) => {
            formikErrors(error.response.data.errors);
        },
        onSuccess: async (data, variables) => {
            queryClient.invalidateQueries(['stores',1]);
            if(store.id == ''){
                const branch = store?.branch;
                branch.branchable_id = data?.data?.data?.id;
                //await storeBranch(store.branch);
            }
            navigation.navigate('StoresList',{ level: 'success',  flashMessage: data?.data?.message , page: 1}); 
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