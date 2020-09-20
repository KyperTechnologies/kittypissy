import React, { Component } from "react";
import {
    Form,
    Input,
    Select,
    Button,
    message,
    Alert
} from 'antd';
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import MailService from "../../service/MailService";
import styleModule from "../UserProfile/style.module.css";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            role: "",
            cartData: null,
        };
    }

    onFinish = async (values) => {
        console.log(values);
        const jsonBody = {
            email: values.mail.email,
            introduction: values.mail.introduction,
            name: values.mail.name,
            phone: values.mail.phone,
            subject: values.mail.subject
        }
        const response = await MailService.sendMail(jsonBody);
        if (response) {
            message.success({
                content: "Mail gonderildi!",
                style: { marginTop: "100px" },
            });
        } else {
            message.error({
                content: "Mail gonderme basarisiz!",
                style: { marginTop: "100px" },
            });
        }
    }

    render() {
        const { Option } = Select;
        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select defaultValue={90} style={{ width: 70 }}>
                    <Option value="90">+90</Option>
                </Select>
            </Form.Item>
        );

        return (
            <GridContainer style={{ justifyContent: "center", marginTop: "-30px" }}>
                <GridItem xs={12} sm={12} md={8}>
                    <Card className={styleModule.card}>
                        <CardBody>
                            <h4 className={styleModule.title3}>ILETISIME GEC</h4>
                            <span className={styleModule.title4} style={{ fontSize: "14px" }}>kyperbeast@gmail.com</span>
                            <span className={styleModule.title4} style={{ fontSize: "14px" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span className={styleModule.title4} style={{ fontSize: "14px" }}>+90 554 999 3690</span>
                            <p className={styleModule.title4} style={{ fontSize: "14px" }}>Bugday Pazari Mahallesi Esentepe Caddesi Cankiri, Merkez</p>
                            <Form name="nest-messages" onFinish={this.onFinish}>
                                <Form.Item
                                    name={['mail', 'name']}
                                    rules={[
                                        {
                                            required: true,
                                            message: <Alert style={{marginTop: "10px", marginBottom: "10px"}} message="Isim girilmesi zorunludur" type="error"/>
                                        },
                                    ]}

                                >
                                    <Input placeholder="Isim" />
                                </Form.Item>
                                <Form.Item
                                    name={['mail', 'email']}
                                    initialValue={localStorage.getItem("email")}
                                    rules={[
                                        {
                                            required: true,
                                            message: <Alert style={{marginTop: "10px", marginBottom: "10px"}} message="Email girilmesi zorunludur" type="error"/>
                                        },
                                        {
                                            type: 'email',
                                            message: <Alert style={{marginTop: "10px", marginBottom: "10px"}} message="Lutfen gecerli bir Email adresi giriniz" type="error"/>
                                        },
                                    ]}
                                >
                                    <Input disabled placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name={['mail', 'phone']}
                                    rules={[{ required: true, message: <Alert style={{marginTop: "10px", marginBottom: "10px"}} message="Telefon girilmesi zorunludur" type="error"/> }, { pattern: "^[0-9]+$", message: <Alert style={{marginTop: "10px", marginBottom: "10px"}} message="Lutfen gecerli bir Telefon giriniz" type="error"/> }]}
                                >
                                    <Input placeholder="Telefon" addonBefore={prefixSelector} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    name={['mail', 'subject']}
                                    rules={[
                                        {
                                            required: true,
                                            message:<Alert style={{marginTop: "10px", marginBottom: "10px"}} message="Konu girilmesi zorunludur" type="error"/>
                                        },
                                    ]}

                                >
                                    <Input placeholder="Konu" />
                                </Form.Item>
                                <Form.Item name={['mail', 'introduction']} rules={[{ required: true, message: <Alert style={{marginTop: "10px", marginBottom: "10px"}} message="Mesaj girilmesi zorunludur" type="error"/> }]}
                                >
                                    <Input.TextArea placeholder="Mesajinizi yaziniz..." />
                                </Form.Item>
                                <Form.Item style={{ textAlign: "right" }}>
                                    <Button htmlType="submit">
                                        Gonder
                                </Button>
                                </Form.Item>
                            </Form>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default Contact;