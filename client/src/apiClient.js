const axios = require("axios");
const apiClient = axios.create();

apiClient.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (
    //   error.response.data.message === "Token is not valid!" ||
    //   error.response.data.message === "Account is not active!"
    // ) {
    window.location.href = "http://localhost:3000";
    // }

    return Promise.reject(error);
  }
);
export default apiClient;
