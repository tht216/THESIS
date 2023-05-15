import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getToken} from './localstorage';
import {API_URL} from './constant';

export const api = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: 'api',

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: async headers => {
      const token = await getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // Các endpoints (lệnh gọi request)
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: `auth/login/`,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: `auth/register/`,
        method: 'POST',
        body: credentials,
      }),
    }),
    resend: builder.mutation({
      query: id => ({
        url: `auth/resend/${id}`,
        method: 'POST',
        body: id,
      }),
    }),
    verifyAccount: builder.mutation({
      query: ({id, ...patch}) => ({
        url: `auth/verifyOTP/${id}`,
        method: 'POST',
        body: patch,
      }),
    }),
    getDetail: builder.query({
      query: () => ({
        url: `customer/detail`,
        method: 'GET',
      }),
    }),
    getCompany: builder.query({
      query: () => ({
        url: `company/getAllCompany`,
        method: 'GET',
      }),
    }),
    getFilterCompany: builder.query({
      query: patch => ({
        url: `company/getFilterCompany`,
        method: 'POST',
        body: patch,
      }),
    }),
    bookPickup: builder.mutation({
      query: patch => ({
        url: `pickup/book`,
        method: 'POST',
        body: patch,
      }),
    }),
    historyPickup: builder.query({
      query: () => ({
        url: `pickup/getDetailCustomer`,
        method: 'GET',
      }),
    })
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useResendMutation,
  useVerifyAccountMutation,
  useGetDetailQuery,
  useGetCompanyQuery,
  useGetFilterCompanyQuery,
  useBookPickupMutation,
  useHistoryPickupQuery
} = api;
