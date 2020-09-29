import axios from 'axios';
const endPoint = "http://54.160.141.173:3010/api/vendor/pointOfSaleErrors";
let apiKey =  window.location.href.split('=')[1] ? window.location.href.split('=')[1] : 0
export const getPointOfSaleErrors = () => {
    return axios.get(`${endPoint}`,{
        headers: {
            api_key: apiKey
        }
    }).then((res) => res.data);
};
export const putPointOfSaleErrors = (key,body) => {
    return axios.put(`${endPoint}/${key}`,body,{
        headers: {
            api_key: apiKey
        }
    }).then((res) => res.data);
};