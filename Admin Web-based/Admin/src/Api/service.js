import request from "../Utils/request";

export const getAllServiceRequest = (params) => {
  return request.post("http://localhost:3000/api/v1/service/admin", params);
};

export const createServiceRequest = (params) => {
  return request.post("http://localhost:3000/api/v1/service/create/admin", params);
};

export const editServiceRequest = (params) => {
  return request.patch(
    `http://localhost:3000/api/v1/service/admin/${params.id}`,
    params.form
  );
};

export const deleteServiceRequest = (params) => {
  return request.delete(`http://localhost:3000/api/v1/service/admin/${params}`);
};

export const getDetailServiceRequest = (params) => {
  return request(`http://localhost:3000/api/v1/service/detail/admin/${params}`);
};
