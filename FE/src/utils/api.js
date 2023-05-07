import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getStorage} from './localstorage';

export const api = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: 'api',

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.7:3000/api/v1',

    prepareHeaders: headers => {
      const token = getStorage('token');
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
  }),
});
export const {useLoginMutation, useRegisterMutation, useResendMutation, useVerifyAccountMutation} = api;
