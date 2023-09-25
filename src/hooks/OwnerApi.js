import axiosRoute from "../utils/route";
import { useState } from "react";
import { useQuery, useMutation , useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";

const fetchOwners = async (page) => {
    const res = await axiosRoute.get('owners.index', {page: page});
    console.log(res.data);
    return res.data;
}

const getOwners = (page) => {
    const [owners,setOwners] = useState([]);
    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['owners',page],
        queryFn: () => fetchOwners(page), 
        onError: (error) => {
            console.log(error);
        },
        onSuccess:(data) => {
            console.log(data?.meta?.current_page);
            //setOwners(data?.data);
            if(data?.meta?.current_page === 1){
                setOwners(data?.data);
            }else{
                setOwners([...owners, ...data?.data]);
            }
        },
        refetchOnWindowFocus:false
    });
    
    return {data, isLoading, isError, isFetching, error , owners}
}

const fetchOneOwner = async(id) => {
    const res = await axiosRoute.get('owners.show', id)
    console.log(res.data);
    return res.data;
}

const getOwner = (id) => {
    const { data, isLoading, isError, error,isFetching ,isSuccess } = useQuery({
        queryKey: ['owner'], 
        queryFn: () => fetchOneOwner(id), 
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


const storeOwner = (owner) => (axiosRoute.post('owners.store', null, owner));

const updateOwner = (owner) => (axiosRoute.put('owners.update', owner.id, owner));

//owner CREATE - UPDATE 
const createEditOwner = (owner) => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    const createEditOwnerMutation = useMutation({
        mutationFn: (owner.id == '' ?  storeOwner : updateOwner),
        
        onError: (error, variables) => {
            console.log(error);
        },
        onSuccess: (data, variables) => {
            console.log('guardado');
            queryClient.invalidateQueries(['owners',1]);      
            navigation.navigate('Home',{screen: 'OwnersList', params: { level: 'success',  flashMessage: data?.data?.message , page: 1}}); 
            //navigation.navigate('BrandList',{ level: 'success', flashMessage: data?.data?.message }); asi en un futuro
        },
    });
    return createEditOwnerMutation;
}

//owner.delete
const destroyOwner = (owner) => axiosRoute.delete('owners.destroy', owner.id);

const deleteOwner = () => {

    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    const deleteOwnerMutation = useMutation({
        mutationFn: destroyOwner,
        
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log('eliminado');
            queryClient.invalidateQueries(['owners',1]); 
            navigation.navigate('Home',{screen: 'OwnersList', params: { level: 'success',  flashMessage: data?.data?.message, page: 1}}); 
            //navigation.navigate('BrandList',{ level: 'success', flashMessage: data?.data?.message }); asi en un futuro
        },
    });
    return deleteOwnerMutation;
}

export {getOwners , getOwner, createEditOwner ,deleteOwner};