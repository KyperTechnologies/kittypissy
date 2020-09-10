import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import {
  Form,
  Alert
} from 'antd';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "DINSchrift",
    fontSize: "25px",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    showPassword: false,
    userDetails: {},
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const profileUpdate = async (values) => {
    console.log(values.user);
    const userEmail = localStorage.getItem("email");
  }

  const passwordUpdate = (values) => {
    console.log(values.user);
  }

  return (
    <div>
      <GridContainer style={{ justifyContent: "center" }}>
        <GridItem md={8}>
          <Form
            layout="vertical"
            name="profile"
            initialValues={{
              remember: true,
            }}
            onFinish={profileUpdate}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Profili Duzenle</h4>
                <p className={classes.cardCategoryWhite}>Eksik bilgilerinizi tamamlayabilirsiniz</p>
              </CardHeader>
              <CardBody style={{ marginTop: "20px" }}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <Form.Item
                      name={['user', 'email']}
                    >
                      <TextField
                        label="Email Adresi"
                        fullWidth
                      />
                    </Form.Item>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Form.Item
                      name={['user', 'phone']}
                    >
                      <TextField
                        label="Telefon No"
                        fullWidth
                      />
                    </Form.Item>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Form.Item
                      name={['user', 'name']}
                    >
                      <TextField
                        label="Isim"
                        id="name"
                        fullWidth
                      />
                    </Form.Item>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Form.Item
                      name={['user', 'surname']}
                    >
                      <TextField
                        label="Soyisim"
                        fullWidth
                      />
                    </Form.Item>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Form.Item
                      name={['user', 'adress']}
                    >
                      <TextField
                        label="Adres"
                        fullWidth
                        multiline
                        rows={5}
                      />
                    </Form.Item>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter style={{ justifyContent: "center" }}>
                <Button type="submit" color="github" round>Guncelle</Button>
              </CardFooter>
            </Card>
          </Form>
        </GridItem>
      </GridContainer>
      <GridContainer style={{ justifyContent: "center", marginTop: "60px" }}>
        <GridItem md={8}>
          <Form
            layout="vertical"
            name="profile"
            initialValues={{
              remember: true,
            }}
            onFinish={profileUpdate}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Sifre Degistir</h4>
              </CardHeader>
              <CardBody style={{ marginTop: "20px" }}>
                <GridContainer style={{ justifyContent: "center" }}>
                  <GridItem xs={12} sm={12} md={8}>
                    <Form.Item
                      name={['user', 'oldpassword']}
                      rules={[
                        {
                          required: true,
                          message: (<Alert style={{ marginTop: "10px" }} message="Lutfen sifre giriniz" type="error" />)
                        },
                        () => ({
                          validator(rule, value, callback) {
                            if (value && value.length < 8) {
                              callback(
                                (<Alert style={{ marginTop: "10px" }} message="Sifre en az 8 karakter uzunlugunda olmalidir" type="error" />)
                              );
                            } else if (
                              value &&
                              !(
                                /\d/.test(value) &&
                                /[a-z]/.test(value) &&
                                /[A-Z]/.test(value)
                              )
                            ) {
                              callback(
                                (<Alert style={{ marginTop: "10px" }} message="Sifre en az 1 sayi, 1 kucuk harf ve 1 buyuk harf icermelidir" type="error" />)
                              );
                            } else {
                              callback();
                            }
                          },
                        }),
                      ]}

                    >
                      <TextField
                        fullWidth
                        label="Eski Şifre"
                        type={values.showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (<InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              style={{ marginRight: "5px" }}
                            >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>),
                        }}
                      />
                    </Form.Item>
                  </GridItem>
                </GridContainer>
                <GridContainer style={{ justifyContent: "center" }}>
                  <GridItem xs={12} sm={12} md={8}>
                    <Form.Item
                      name={['user', 'password']}
                      rules={[
                        {
                          required: true,
                          message: (<Alert style={{ marginTop: "10px" }} message="Lutfen sifre giriniz" type="error" />)
                        },
                        () => ({
                          validator(rule, value, callback) {
                            if (value && value.length < 8) {
                              callback(
                                (<Alert style={{ marginTop: "10px" }} message="Sifre en az 8 karakter uzunlugunda olmalidir" type="error" />)
                              );
                            } else if (
                              value &&
                              !(
                                /\d/.test(value) &&
                                /[a-z]/.test(value) &&
                                /[A-Z]/.test(value)
                              )
                            ) {
                              callback(
                                (<Alert style={{ marginTop: "10px" }} message="Sifre en az 1 sayi, 1 kucuk harf ve 1 buyuk harf icermelidir" type="error" />)
                              );
                            } else {
                              callback();
                            }
                          },
                        }),
                      ]}

                    >
                      <TextField
                        fullWidth
                        label="Yeni Şifre"
                        type={values.showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (<InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              style={{ marginRight: "5px" }}
                            >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>),
                        }}
                      />
                    </Form.Item>
                  </GridItem>
                </GridContainer>
                <GridContainer style={{ justifyContent: "center" }}>
                  <GridItem xs={12} sm={12} md={8}>
                    <Form.Item
                      name={['user', 'rePassword']}
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: (<Alert style={{ marginTop: "10px" }} message="Lutfen sifrenizi tekrar giriniz" type="error" />)
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue(['user', 'password']) === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              (<Alert style={{ marginTop: "10px" }} message="Girilen sifreler eslesmiyor, Lutfen tekrar deneyin" type="error" />)
                            );
                          },
                        }),
                      ]}
                    >
                      <TextField
                        fullWidth
                        label="Şifrenizi tekrar giriniz"
                        type={values.showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (<InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              style={{ marginRight: "5px" }}
                            >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>),
                        }}
                      />
                    </Form.Item>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter style={{ justifyContent: "center" }}>
                <Button type="submit" color="github" round>Guncelle</Button>
              </CardFooter>
            </Card>
          </Form>
        </GridItem>
      </GridContainer>
    </div >
  );
}
