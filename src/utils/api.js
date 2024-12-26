import axios from "axios";

axios.defaults.baseURL=process.env.REACT_APP_BASE_URL
export async function sendRequest(
    method,
    url,
    data,
    config
) {
    if(method==="get"){
        return axios.get(url,config)
    }
    return axios[method](url,data,config)
}