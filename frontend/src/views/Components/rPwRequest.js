import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  message,
  Alert
} from 'antd';
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import styles from "../../assets/jss/material-kit-react/views/componentsSections/loginStyle.js";
import styleModule from "../Components/Sections/style.module.css";
import MailService from "../../service/MailService";
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";

const useStyles = makeStyles(styles);
const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select defaultValue={90} style={{ width: 70 }}>
      <Option value="90">+90</Option>
    </Select>
  </Form.Item>
);


export default function SectionLogin(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const onFinish = async (values) => {
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
  return (
    <div className={classes.section}>
      <Header
        isMain={false}
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}>
      </Header>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem md={2}>
          </GridItem>
          <GridItem md={8}>
            <Card>
              <CardBody>
                <h4 className={styleModule.title3}>SIFRENIZI MI UNUTTUNUZ?</h4>
                <p>Lütfen aşağıdaki bilgileri eksiksiz giriniz.</p>
                <span>Eğer bilgilerden emin değilseniz hemen bizimle iletişime geçin!</span>
                <Form name="nest-messages" onFinish={onFinish}>
                  <Form.Item
                    name={['mail', 'email']}
                    rules={[
                      {
                        required: true,
                        message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Email girilmesi zorunludur" type="error" />
                      },
                      {
                        type: 'email',
                        message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Lutfen gecerli bir Email adresi giriniz" type="error" />
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name={['mail', 'phone']}
                    rules={[{ required: true, message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Telefon girilmesi zorunludur" type="error" /> }, { pattern: "^[0-9]+$", message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Lutfen gecerli bir Telefon giriniz" type="error" /> }]}
                  >
                    <Input placeholder="Telefon" addonBefore={prefixSelector} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" >
                      Gönder
                      </Button>
                  </Form.Item>
                  <Button href="/">
                    İletişime geçin
                      </Button>
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
