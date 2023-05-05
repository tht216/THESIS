import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getStorage} from './localstorage';

export const api = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: 'api',

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.7:3000/api/v1',

    prepareHeaders: (headers) => {
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
  }),
});
export const {useLoginMutation} = api;
