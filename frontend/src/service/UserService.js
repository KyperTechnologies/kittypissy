import Axios from 'axios';
import config from '../config';
import { message } from 'antd';

class UserService {
    static login(body) {
        console.log(body);
        Axios.post(`${config.ip}/login`, body)
            .then(response => {
                if (response.status === 200) {
                    const form = new FormData();
                    form.append("grant_type", "password");
                    form.append("username", body.email);
                    form.append("password", body.password);
                    form.append("role", response.data.role);
                    Axios.post(`${config.ip}/oauth/token`, form, {
                        auth: {
                            username: response.data.oauthUsername,
                            password: response.data.oauthPassword
                        }
                    })
                        .then(response => {
                            localStorage.setItem("email", body.email);
                            localStorage.setItem("password", body.password);
                            localStorage.setItem("access_token", response.data.access_token);
                            localStorage.setItem("refresh_token", response.data.refresh_token);
                            localStorage.setItem("token_type", response.data.token_type);
                            message.success({
                                content: "Giris Basarili...",
                                style: { marginTop: "100px" },
                            });

                        })
                        .catch(error => {
                            console.log(error);
                            message.error({
                                content: "Giris Basarisiz!",
                                style: { marginTop: "100px" },
                            });
                        })
                }
            })
            .catch(error => {
                console.log(error.message);
                message.error({
                    content: "Giris Basarisiz!",
                    style: { marginTop: "100px" },
                });
            });
    }

    static register(body){
        console.log(body);
        Axios.post(`${config.ip}/register`, body)
            .then(response => {
                if (response.status === 200) {
                    message.success({
                        content: "Kayit Basarili!",
                        style: { marginTop: "100px" },
                    });
                }
            })
            .catch(error => {
                message.error({
                    content: "Kayit Basarisiz!",
                    style: { marginTop: "100px" },
                });
            });
    }
}

export default UserService;
