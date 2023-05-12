import {configureStore} from '@reduxjs/toolkit';
import {api} from './src/utils/api';
import userReduce from './src/context/userSlicer';
import {goongApi} from './src/utils/goongapi';
export const store = configureStore({
  reducer: {
    // Tạo thêm slice từ api
    [api.reducerPath]: api.reducer,
    [goongApi.reducerPath]: goongApi.reducer,
    userReduce,
  },

  // Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware).concat(goongApi.middleware),
});
