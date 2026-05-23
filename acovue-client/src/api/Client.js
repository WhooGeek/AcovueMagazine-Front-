import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// 인터셉터 요청
client.interceptors.request.use(
    (config) =>{
        //   1. 스토리지에서 토큰 가져오기
        const token = localStorage.getItem("accessToken");

        if(token){
            // 2 토큰 있다면 헤더에 넣기
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;