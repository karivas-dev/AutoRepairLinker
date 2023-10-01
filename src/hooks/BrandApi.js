import {useMutation, useQuery, useQueryClient} from "react-query";
import axiosRoute from "../utils/route";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";


//Brand.index
const fetchBrands = async (page) => {
    return (await axiosRoute.get('brands.index', {page: page})).data;
}

const getBrands = (page) => {
    const [brands,setBrands] = useState([]);
    const { data, isLoading, isError, isFetching, error } = useQuery({
        //queryKey: 'brands', /* ['brands',page] */
        queryKey: ['brands',page],
        queryFn: () => fetchBrands(page),
        onSuccess:(data) => {
            //console.log(data?.meta?.current_page);
            setBrands(data?.data);
            /* if(data?.meta?.current_page === 1){
                setBrands(data?.data);
            }else{
                setBrands([...brands, ...data?.data]);
            } */
        },
        refetchOnWindowFocus:false
    });
    //console.log(isLoading, isError)
    return {data, isLoading, isError, isFetching, error , brands}

}

//Brand.show
const fetchOneBrand = async (id) => {
    return (await axiosRoute.get('brands.show', {brand: id})).data;
}

const getBrand = (id) => {
    const { data:brand, isLoading, isError, error,isFetching ,isSuccess } = useQuery({
        queryKey: ['brand'], 
        queryFn: () => fetchOneBrand(id),
        refetchOnWindowFocus:false
    });

    return { data:brand, isLoading, isError, error, isFetching , isSuccess}
}

//Brand.store
const storeBrand = (brand) => (axiosRoute.post('brands.store', null, brand));

//Brand.update
const updateBrand = (brand) => (axiosRoute.put('brands.update', brand.id, brand));

//Brand CREATE - UPDATE 
const createEditBrand = (formikErrors, brand) => {
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    return useMutation({
        mutationFn: (brand.id == '' ? storeBrand : updateBrand),

        onError: (error) => {
            formikErrors(error.response.data.errors);
        },
        onSuccess: (data, variables) => {
            console.log('guardado');
            queryClient.invalidateQueries(['brands', 1]); //para recargar el query, debe ir con el nombre del queryKey y si tiene parametro ponerlo
            navigation.navigate('Home', {
                screen: 'BrandsList',
                params: {level: 'success', flashMessage: data?.data?.message}
            });
            //navigation.navigate('BrandList',{ level: 'success', flashMessage: data?.data?.message }); asi en un futuro
        },
    });
}

//Brand.delete
const destroyBrand = (brand) => axiosRoute.delete('brands.destroy', brand.id);

const deleteBrand = () => {
    
    const queryClient = new useQueryClient();
    const navigation = useNavigation();

    const deleteBrandMutation = useMutation({
        mutationFn: destroyBrand,

        onSuccess: (data) => {
            console.log('eliminado');
            queryClient.invalidateQueries(['brands',1]); //para recargar el query, debe ir con el nombre del queryKey y si tiene parametro ponerlo aca por defecto 1 por la pagina 1 xd
            navigation.navigate('Home',{screen: 'BrandsList', params: { level: 'success',  flashMessage: 'La marca se elimino correctamente.'/*  flashMessage: data?.data?.message */ }}); 
            //navigation.navigate('BrandList',{ level: 'success', flashMessage: data?.data?.message }); asi en un futuro
        },
    });
    return deleteBrandMutation;
}

export { getBrands , getBrand, createEditBrand, deleteBrand};