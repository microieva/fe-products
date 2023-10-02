import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category, Product } from '../../@types/product';


const categoryQueries = createApi({

    reducerPath: "categoryReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.escuelajs.co/api/v1/categories'
    }),
    tagTypes: ['Categories', 'Products'],
    endpoints: (build) => ({
        getCategories: build.query<Category[], undefined>({
            query: () => '/',
            providesTags: ['Categories'],
        }),
        getProductsByCategory: build.query<Product[], string>({
            query: (categoryId) => `/${categoryId}/products`,
            providesTags: ['Products'],
        })
    }),
});

export const { 
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery
 } = categoryQueries;
export default categoryQueries;