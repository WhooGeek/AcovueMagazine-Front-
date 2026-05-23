import axios from "axios";

const client = axios.create({
    withCredentials: true,
});

const refreshClient = axios.create({
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

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if(!originalRequest){
            return Promise.reject(error);
        }

        if(error.response?.status === 401 && !originalRequest._retry){

            originalRequest._retry = true;

            try{
                const refreshToken = localStorage.getItem("refreshToken");

                if(!refreshToken){
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }
                
                const response = await refreshClient.post("/api/member/reissue", null,{
                    headers: {
                        "Refresh-Token": `Bearer ${refreshToken}`,
                    },
                });

                const newAccessToken = response.data?.data?.accessToken;

                if(!newAccessToken){
                    throw new Error("새 accessToken이 응답에 없습니다.");
                }

                localStorage.setItem("accessToken", newAccessToken);

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return client(originalRequest);
                } catch(refreshError){
                    console.error("토큰 재발급 실패", refreshError);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }

        return Promise.reject(error);
    }
);

export default client;