// app/services/productsData.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ProductsResponse,
  DeleteProductResponse,
} from "../../types/productType";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({

    getAllProduct: builder.query<ProductsResponse, { limit: number }>({
      query: ({ limit = 0 }) => `products?limit=${limit}`,
      providesTags: ["Products"],
    }),


    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),


    deleteProduct: builder.mutation<DeleteProductResponse, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),

      //  manually update the cache since real deletion doesn't happen
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApi.util.updateQueryData(
            "getAllProduct",
            { limit: 0 },
            (draft) => {
              // Find and remove the product with the given id
              const index = draft.products.findIndex(
                (product) => product.id === id
              );
              if (index !== -1) draft.products.splice(index, 1);
            }
          )
        );
        try {
          await queryFulfilled;    
        } catch {    
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
} = productsApi;
