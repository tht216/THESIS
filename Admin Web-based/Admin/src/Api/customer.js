import request from "../Utils/request";
const BASE_URL = "https://quanlycudan.azurewebsites.net/api";

export const getAllCustomerRequest = (params) => {
  return request.post("http://localhost:3000/api/v1/customer/", params);
};

export const createCustomerRequest = (params) => {
  return request.post("http://localhost:3000/api/v1/customer/create", params);
};

export const editCustomerRequest = (params) => {
  return request.patch(
    `http://localhost:3000/api/v1/customer/${params.id}`,
    params.form
  );
};

export const deleteCustomerRequest = (params) => {
  return request.delete(`http://localhost:3000/api/v1/customer/${params}`);
};

export const getDetailCustomerRequest = (params) => {
  return request(`http://localhost:3000/api/v1/customer/detail/${params}`);
};
