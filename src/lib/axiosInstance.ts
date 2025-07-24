import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://ecom.brokercell.com/api/",
})

axiosInstance.interceptors.request.use((config) => {
  if (typeof window != "undefined") {
    const token = localStorage.getItem("token");
    const storeId = localStorage.getItem("storeId");
    if (token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (storeId){
      config.headers["storeId"] = Number(storeId);
    }
  }

  return config;
})

export default axiosInstance;
