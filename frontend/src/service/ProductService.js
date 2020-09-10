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
                if (response.status == 200) {
                    return response.data;
                }
            })
            .catch(error => {

            });
    }
}
export default ProductService;