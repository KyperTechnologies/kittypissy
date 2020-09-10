import Axios from 'axios';
import config from '../config';
import { message } from 'antd';

class UserService {
    static async login(body) {
        return await Axios
                .post(`${config.ip}/login`, body)
                .then(async (response) => {
                    if (response.status === 200) {
                        const form = new FormData();
                        const role = response.data.role;
                        form.append("grant_type", "password");
                        form.append("username", body.email);
                        form.append("password", body.password);
                        form.append("role", role);
                        return await Axios.post(`${config.ip}/oauth/token`, form, {
                            auth: {
                                username: response.data.oauthUsername,
                                password: response.data.oauthPassword
                            }
                        })
                            .then(response => {
                                localStorage.setItem("email", body.email);
                                localStorage.setItem("password", body.password);
                                localStorage.setItem("role", role);
                                localStorage.setItem("access_token", response.data.access_token);
                                localStorage.setItem("refresh_token", response.data.refresh_token);
                                localStorage.setItem("token_type", response.data.token_type);
                                message.success({
                                    content: "Giris Basarili...",
                                    style: { marginTop: "100px" },
                                });
                                return true;
                            })
                            .catch(error => {
                                console.log(error);
                                message.error({
                                    content: "Giris Basarisiz!",
                                    style: { marginTop: "100px" },
                                });
                                return false;
                            })
                    }
                })
                .catch(error => {
                    console.log(error.message);
                    message.error({
                        content: "Giris Basarisiz!",
                        style: { marginTop: "100px" },
                    });
                    return false;
                });
    }

    static async register(body){
        return await Axios.post(`${config.ip}/register`, body)
            .then(response => {
                if (response.status === 200) {
                    message.success({
                        content: "Kayit Basarili!",
                        style: { marginTop: "100px" },
                    });
                }
                return true;
            })
            .catch(error => {
                message.error({
                    content: "Kayit Basarisiz!",
                    style: { marginTop: "100px" },
                });
                return false;
            });
    }

    static async getUserDetails(userEmail) {
        const auth = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        return await Axios.get(`${config.ip}/getUserDetails?userEmail=${userEmail}`, auth)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {
                return error;
            });
    }

    static async getUserRole(userEmail) {
        const auth = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        return await Axios.get(`${config.ip}/getUserRole?userEmail=${userEmail}`, auth)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {
                return error;
            });
    }

    static async updateUser(body) {
        const auth = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        return await Axios.post(`${config.ip}/updateUser`, body, auth)
            .then(response => {
                if (response.status === 200) {
                    message.success({
                        content: "Guncelleme Basarili!",
                        style: { marginTop: "100px" },
                    });
                    return true;
                }
            })
            .catch(error => {
                message.error({
                    content: "Guncelleme Basarisiz!",
                    style: { marginTop: "100px" },
                });
                return false;
            });
    }

    static async updateUserPassword(body) {
        const auth = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
        return await Axios.post(`${config.ip}/updateUserPassword`, body, auth)
            .then(response => {
                if (response.status === 200) {
                    message.success({
                        content: "Guncelleme Basarili!",
                        style: { marginTop: "100px" },
                    });
                    return true;
                }
            })
            .catch(error => {
                message.error({
                    content: "Guncelleme Basarisiz!",
                    style: { marginTop: "100px" },
                });
                return false;
            });
    }
}

export default UserService;
