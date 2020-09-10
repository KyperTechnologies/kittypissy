import Axios from 'axios';
import config from '../config';

class OrderService {
    static async getAllOrders() {
        return await Axios.get(`${config.ip}/getAllOrders?access_token=${localStorage.getItem(
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

    static async getOrdersByEmail(userEmail) {
        return await Axios.get(`${config.ip}/getOrdersByEmail?userEmail=${userEmail}&access_token=${localStorage.getItem(
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

    static async getOrderById(id) {
        return await Axios.get(`${config.ip}/getOrderById?orderId=${id}&access_token=${localStorage.getItem(
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
}

export default OrderService;