import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginationQuery } from '../../@types/paginationQuery';
import { Product } from '../../@types/product';

const productQueries  = createApi({
    //base query for all api calls
    reducerPath: "productReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.escuelajs.co/api/v1/products'
    }),
    tagTypes: ['Products'],
    endpoints: builder => ({
        // this creates a hook from dispatch and async thunk action -> to return data error and loading
        fetchAllProducts: builder.query<Product[], PaginationQuery>({
            query: ({limit, offset}) => `?limit=${limit}&offset=${offset}`,
            providesTags: ['Products']
        }), // when we call fetchAllPr we send get request to the chain of baseUrl+query ending
        deleteProduct: builder.mutation<boolean, string>({
            query: (productId) => ({url: `${productId}`, method: 'DELETE'}),
            invalidatesTags: ['Products']
        })
    })
})

export const {useFetchAllProductsQuery, useDeleteProductMutation} = productQueries;
export default productQueries;

