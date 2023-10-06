import axiosRoute from "../utils/route";
import { useState } from "react";
import { useQuery, useMutation , useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";

const fetchBranches = async (page,branchId) => (await axiosRoute.get('branches.index', { branch:branchId , page: page})).data;

const fethcOneBranch =  async(id) => (await axiosRoute.get('branches.show', id)).data;

const getBranches = (page) => {
    const [branches,setBranches] = useState([]);
    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['branches',page],
        queryFn: () => fetchBranches(page), 
        onError: (error) => {
            console.log(error);
        },
        onSuccess:(data) => {
            setBranches(data?.data);
        },
        refetchOnWindowFocus:false
    });
    return {data, isLoading, isError, isFetching, error , branches}

}

const getBranch = (id) => {
    const { data, isLoading, isError, error,isFetching ,isSuccess } = useQuery({
        queryKey: ['branch'], 
        queryFn: () => fethcOneBranch(id), 
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

const storeBranch = (branch) => (axiosRoute.post('branches.store', null, branch),console.log(branch));

const updateBranch = (branch) => (axiosRoute.patch('branches.update', garage.id, branch));

const createEditBranch = (branch) => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();
    return useMutation({
        mutationFn: (branch.id == '' ?  storeBranch : updateBranch),
        
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log('guardado');
        },
    });
}

const destroyBranch = (branch) => axiosRoute.delete('branches.destroy', branch.id);

const deleteBranch = () => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: destroyBranch,
        
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log('eliminado');
            queryClient.invalidateQueries(['branches',1]); 
            navigation.navigate('Home',{screen: 'GarageList', params: { level: 'success',  flashMessage: 'El garage se elimino correctamente.' }}); 
        },
    });
}
export {getBranches ,getBranch ,createEditBranch, deleteBranch}