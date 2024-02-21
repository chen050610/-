import axios from 'axios'

const instance= axios.create({
    baseURL:'http://127.0.0.1:3007',
    timeout:6000,
    headers:{
        "Content-Type":'application/x-www-form-urlencoded'
    }
})

instance.interceptors.request.use(
    (config) => {

        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance