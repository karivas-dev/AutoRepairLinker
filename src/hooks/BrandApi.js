import axiosRoute from "../utils/route";

const fetchBrands = async (page) => {
    const res = await axiosRoute.get('brands.index', {page: page});
    console.log(res.data);
    return res.data;
}

const fetchOneBrand = async (id) => {
    const res = await axiosRoute.get('brands.show', {brand: id})
    console.log(res.data);
    return res.data;
}

const storeBrand = (brand) => (axiosRoute.post('brands.store', null, brand));

const updateBrand = (brand) => (axiosRoute.put('brands.update', brand.id, brand));

export {fetchBrands, fetchOneBrand, storeBrand, updateBrand};