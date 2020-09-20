import Axios from 'axios';
import config from '../config';

class MailService {

    static async sendMail(body) {
        return await Axios.post(`${config.ip}/sendMail`, body)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {
                return false;
            });
    }
}

export default MailService;