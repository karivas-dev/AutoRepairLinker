import axiosRoute from "../utils/route";
import { useEffect, useState } from "react";
import { useQuery, useMutation , useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";

const fetchTickets = async (page) => (await axiosRoute.get('tickets.index', { page: page})).data;

const getTickets = (page) => {
    const [tickets,setTickets] = useState([]);
    const { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['tickets',page],
        queryFn: () => fetchTickets(page), 
        onError: (error) => {
            console.log(error);
        },
        onSuccess:(data) => {
            if(data?.meta?.current_page === 1){
                setTickets(data?.data);
            }else{
                setTickets([...tickets, ...data?.data]);
            }
        },
        refetchOnWindowFocus:false
    });
    
    return {data, isLoading, isError, isFetching, error , tickets}
}

const fetchOneTicket =  async(id) => (await axiosRoute.get('tickets.show', id)).data;

const getTicket = (id) => {
    const { data, isLoading, isError, error, isFetching ,isSuccess } = useQuery({
        queryKey: ['ticket'], 
        queryFn: () => fetchOneTicket(id), 
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

const destroyTicket = (ticket) => axiosRoute.delete('tickets.destroy', ticket.id);

const deleteTicket = () => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: destroyTicket,
        
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log('eliminado');
            queryClient.invalidateQueries('tickets'); 
            navigation.navigate('TicketsList', { level: 'success',  flashMessage: data?.data?.message, page: 1});
        },
    });
}


export {getTickets, getTicket , deleteTicket};