import axios from 'axios';
const endPoint = "http://54.160.141.173:3010/api/vendor/pointOfSaleErrors";
export const getPointOfSaleErrors = (key,id, apiKey) => {
    return axios.get(`${endPoint}`).then((res) => res.data);
};
export const putPointOfSaleErrors = (key,body) => {
    return axios.put(`${endPoint}/${key}`,body).then((res) => res.data);
};