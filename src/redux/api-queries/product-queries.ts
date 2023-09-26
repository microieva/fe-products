import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginationQuery } from '../../@types/paginationQuery';
import { Product } from '../../@types/product';

const productQueries  = createApi({

    reducerPath: "productReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.escuelajs.co/api/v1/products'
    }),
    tagTypes: ['Products', 'Product'],
    endpoints: builder => ({
        // this creates a hook from dispatch and async thunk action -> to return data error and loading
        getProducts: builder.query({
            query: () => `/`,
            providesTags: ['Products']
        }),
        getProductById: builder.query<Product, number>({
            query: (productId) => `${productId}`,
            providesTags: ['Product']
        }), 
        deleteProduct: builder.mutation<boolean, number>({
            query: (productId) => ({url: `${productId}`, method: 'DELETE'}),
            invalidatesTags: ['Products']
        }),
        addProduct: builder.mutation<Product, Partial<Product>>({
            query: (body) => ({url: `/`, method: 'POST', body}),
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation<Product, Partial<Product>>({
            query: ({id, ...updates}) =>  ({url: `/${id}`, method: 'PUT', body: updates}),
            invalidatesTags: ['Products']
        }),
        filterProductsByTitle: builder.query<Product[], string>({
            query: (query) => ({url:`/?title=${query}`}),
            providesTags: ['Products']
        })
    })
})

export const {
    useGetProductsQuery,
    useFilterProductsByTitleQuery, 
    useDeleteProductMutation, 
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation
} = productQueries;
export default productQueries;

