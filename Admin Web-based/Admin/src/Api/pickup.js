import request from "../Utils/request";

export const getAllPickupRequest = (params) => {
  return request.post("http://localhost:3000/api/v1/pickup/", params);
};

export const createPickupRequest = (params) => {
  return request.post("http://localhost:3000/api/v1/pickup/create", params);
};

export const editPickupRequest = (params) => {
  return request.patch(
    `http://localhost:3000/api/v1/pickup/${params.id}`,
    params.form
  );
};

export const deletePickupRequest = (params) => {
  return request.delete(`http://localhost:3000/api/v1/pickup/${params}`);
};

export const getDetailPickupRequest = (params) => {
  return request(`http://localhost:3000/api/v1/pickup/detail/${params}`);
};
