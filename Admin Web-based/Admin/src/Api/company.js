import request from "../Utils/request";

export const getAllCompanyRequest = (params) => {
  return request.post("http://localhost:3000/api/v1/company/", params);
};

export const createCompanyRequest = (params) => {
  return request.post("http://localhost:3000/api/v1/company/create", params);
};

export const editCompanyRequest = (params) => {
  return request.patch(
    `http://localhost:3000/api/v1/company/${params.id}`,
    params.form
  );
};

export const deleteCompanyRequest = (params) => {
  return request.delete(`http://localhost:3000/api/v1/company/${params}`);
};

export const getDetailCompanyRequest = (params) => {
  return request(`http://localhost:3000/api/v1/company/detail/${params}`);
};
