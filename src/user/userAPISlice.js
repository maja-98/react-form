import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3500/";
const baseQuery = fetchBaseQuery({
  baseUrl,
});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (userData) => {
        const transformedData = userData.map((data) => ({
          ...data,
          ageSex: data.dateOfBirthorAge.toLocaleString() + "/" + data.sex,
          govtId:
            data.govtIdType.length > 0
              ? data.govtIdType + ":" + data.govtIdNumber
              : "",
          guardian:
            data.guardianLabel && data.guardianName
              ? data.guardianLabel + "." + data.guardianName
              : "",
          fullAddress:
            [data.address, data.state, data.country, data.pincode].join(
              ", "
            ) !== ", , , "
              ? [data.address, data.state, data.country, data.pincode].join(
                  ", "
                )
              : "",
        }));
        return transformedData;
      },
      providesTags: (result) => {
        return [
          { type: "User", id: "LIST" },
          ...result.map((code) => ({ type: "User", id: code.id })),
        ];
      },
    }),
    getUsersbyId: builder.query({
      query: (arg) => {
        return {
          url: `/users/${arg.id}`,
          method: "GET",
        };
      },
      providesTags: (result) => [{ type: "User", id: result?.id }],
    }),
    addNewUser: builder.mutation({
      query: (initialCodeData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialCodeData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation({
      query: (initialCodeData) => ({
        url: `/users/${initialCodeData.id}`,
        method: "PATCH",
        body: {
          ...initialCodeData,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "User", id: arg.id }];
      },
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUsersbyIdQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiSlice;
