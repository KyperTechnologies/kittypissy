import Axios from 'axios';
import config from '../config';
import { message } from 'antd';

class ProductService {
    static async getAllProducts() {
        const auth = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };

        return await Axios.get(`${config.ip}/getAllProducts`, auth)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {

            });
    }

    static async getProductById(productId) {
        return await Axios.get(`${config.ip}/getProductById?productId=${productId}&access_token=${localStorage.getItem(
            "access_token"
            )}&token_type=${localStorage.getItem("token_type")}`)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {

            });
    }

    static async addProduct(form) {
        return await Axios.post(`${config.ip}/addProduct?access_token=${localStorage.getItem(
            "access_token"
            )}&token_type=${localStorage.getItem("token_type")}`, form)
            .then(response => {
                if (response.status === 200) {
                    message.success({
                        content: "Urun Eklendi!",
                        style: { marginTop: "100px" },
                    });
                    return response.data;
                }
            })
            .catch(error => {
                message.error({
                    content: "Urun Ekleme Basarisiz!",
                    style: { marginTop: "100px" },
                });
            });
    }

    static async updateProduct(form) {
        return await Axios.post(`${config.ip}/updateProduct?access_token=${localStorage.getItem(
            "access_token"
            )}&token_type=${localStorage.getItem("token_type")}`, form)
            .then(response => {
                if (response.status === 200) {
                    message.success({
                        content: "Urun Guncellendi!",
                        style: { marginTop: "100px" },
                    });
                    return response.data;
                }
            })
            .catch(error => {
                message.error({
                    content: "Urun Guncelleme Basarisiz!",
                    style: { marginTop: "100px" },
                });
            });
    }

    static async updateProductImage(form) {
        return await Axios.post(`${config.ip}/updateProductImage?access_token=${localStorage.getItem(
            "access_token"
            )}&token_type=${localStorage.getItem("token_type")}`, form)
            .then(response => {
                if (response.status === 200) {
                    message.success({
                        content: "Urun Guncellendi!",
                        style: { marginTop: "100px" },
                    });
                    return response.data;
                }
            })
            .catch(error => {
                message.error({
                    content: "Urun Guncelleme Basarisiz!",
                    style: { marginTop: "100px" },
                });
            });
    }

    static async deleteProduct(productId) {
        Axios.delete(`${config.ip}/deleteProduct?productId=${productId}&access_token=${localStorage.getItem(
            "access_token"
            )}&token_type=${localStorage.getItem("token_type")}`)
            .then(response => {
                if (response.status === 200) {
                    message.success({
                        content: "Urun Silindi!",
                        style: { marginTop: "100px" },
                    });
                }
            })
            .catch(error => {
                message.error({
                    content: "Urun Silme Islemi Basarisiz!",
                    style: { marginTop: "100px" },
                });
            });
    }
}

export default ProductService;