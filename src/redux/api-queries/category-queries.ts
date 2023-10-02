import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../../@types/product';


const categoryQueries = createApi({

    reducerPath: "categoryReducer",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.escuelajs.co/api/v1/categories'
    }),
    tagTypes: ['Categories'],
    endpoints: (build) => ({
        getCategories: build.query<Category[], void>({
            query: () => '/',
            providesTags: ['Categories'],
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryQueries;
export default categoryQueries;