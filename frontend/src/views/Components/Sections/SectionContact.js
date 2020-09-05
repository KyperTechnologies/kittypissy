import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/loginStyle.js";
import styleModule from "./style.module.css";
import CardHeader from "../../../components/Card/CardHeader.js";

const useStyles = makeStyles(styles);
const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select defaultValue={90} style={{ width: 70 }}>
      <Option value="90">+90</Option>
    </Select>
  </Form.Item>
);


export default function SectionLogin() {
  const classes = useStyles();

  const onFinish = async (values) => {   
    console.log(values.user);
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem md={2}>
          </GridItem>
          <GridItem md={8}>
            <Card>
              <CardBody>
                <h4 className={styleModule.title3}>ILETISIME GEC</h4>
                <span className={styleModule.title4}>kyperbeast@gmail.com</span>
                <span className={styleModule.title4}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className={styleModule.title4}>+90 554 999 3690</span>
                <p className={styleModule.title4}>Bugday Pazari Mahallesi Esentepe Caddesi Cankiri, Merkez</p>
                <Form name="nest-messages" onFinish={onFinish}>
                  <Form.Item
                    name={['user', 'name']}
                    rules={[
                      {
                        required: true,
                        message: "Isim girilmesi zorunludur"
                      },
                    ]}

                  >
                    <Input placeholder="Isim" />
                  </Form.Item>
                  <Form.Item
                    name={['user', 'email']}
                    rules={[
                      {
                        required: true,
                        message: "Email girilmesi zorunludur"
                      },
                      {
                        type: 'email',
                        message: "Lutfen gecerli bir Email adresi giriniz"
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name={['user', 'phone']}
                    rules={[{ required: true, message: "Telefon girilmesi zorunludur" }, { pattern: "^[0-9]+$", message: "Lutfen gecerli bir Telefon giriniz" }]}
                  >
                    <Input placeholder="Telefon" addonBefore={prefixSelector} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    name={['user', 'subject']}
                    rules={[
                      {
                        required: true,
                        message: "Konu girilmesi zorunludur"
                      },
                    ]}

                  >
                    <Input placeholder="Konu" />
                  </Form.Item>
                  <Form.Item name={['user', 'introduction']} rules={[{ required: true, message: "Mesaj girilmesi zorunludur" }]}
                  >
                    <Input.TextArea placeholder="Mesajinizi yaziniz..." />
                  </Form.Item>
                  <Form.Item style={{ textAlign: "right" }}>
                    <Button size="large" htmlType="submit">
                      Gonder
                      </Button>
                  </Form.Item>
                </Form>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={2}>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
