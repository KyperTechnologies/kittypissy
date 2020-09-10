import React, { Component } from "react";
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
import UserService from "../../service/UserService";
import styleModule from "./style.module.css";


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      userDetails: {},
      profileComponent: null
    };
    this.getUserDetails = this.getUserDetails.bind(this);
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  componentDidMount = async () => {
    const userEmail = localStorage.getItem("email");
    const response = await UserService.getUserDetails(userEmail);
    this.setState({
      userDetails: response,
    })
    this.getUserDetails(response);
  }

  getUserDetails(data) {
    const profileComponent = (<GridContainer style={{ justifyContent: "center" }}>
      <GridItem md={8}>
        <Form
          layout="vertical"
          name="profile"
          initialValues={{
            remember: true,
          }}
          onFinish={this.profileUpdate}>
          <Card>
            <CardHeader color="primary">
              <h4 className={styleModule.cardTitleWhite}>Profili Duzenle</h4>
              <p className={this.cardCategoryWhite}>Eksik bilgilerinizi tamamlayabilirsiniz</p>
            </CardHeader>
            <CardBody style={{ marginTop: "20px" }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <Form.Item
                    name={['user', 'email']}
                    initialValue={data.email}
                  >
                    <TextField
                      label="Email Adresi"
                      fullWidth
                      disabled
                      defaultValue={data.email}
                    />
                  </Form.Item>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Form.Item
                    name={['user', 'phone']}
                    initialValue={data.phone}
                  >
                    <TextField
                      label="Telefon No"
                      fullWidth
                      defaultValue={data.phone}
                    />
                  </Form.Item>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Form.Item
                    name={['user', 'name']}
                    initialValue={data.name}
                  >
                    <TextField
                      label="Isim"
                      id="name"
                      fullWidth
                      defaultValue={data.name}
                    />
                  </Form.Item>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Form.Item
                    name={['user', 'surname']}
                    initialValue={data.surname}
                  >
                    <TextField
                      label="Soyisim"
                      fullWidth
                      defaultValue={data.surname}
                    />
                  </Form.Item>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Form.Item
                    name={['user', 'adress']}
                    initialValue={data.adress}
                  >
                    <TextField
                      label="Adres"
                      fullWidth
                      defaultValue={data.adress}
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
    </GridContainer>);
    this.setState({
      profileComponent: profileComponent,
    });
  }

  profileUpdate = async (values) => {
    const userEmail = localStorage.getItem("email");
    const jsonBody = {
      "email": userEmail,
      "name": values.user.name,
      "surname": values.user.surname,
      "adress": values.user.adress,
      "phone": values.user.phone
    }
    UserService.updateUser(jsonBody);
  }

  passwordUpdate = (values) => {
    const userEmail = localStorage.getItem("email");
    const jsonBody = {
      "email": userEmail,
      "oldPassword": values.user.oldpassword,
      "newPassword": values.user.password,
    }
    UserService.updateUserPassword(jsonBody);
  }

  render() {
    return (
      <div>
        {this.state.profileComponent}
        <GridContainer style={{ justifyContent: "center"}}>
          <GridItem md={8}>
            <Form
              layout="vertical"
              name="profile"
              initialValues={{
                remember: true,
              }}
              onFinish={this.passwordUpdate}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={styleModule.cardTitleWhite}>Sifre Degistir</h4>
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
                          type={this.state.showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (<InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                                edge="end"
                                style={{ marginRight: "5px" }}
                              >
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
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
                          type={this.state.showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (<InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                                edge="end"
                                style={{ marginRight: "5px" }}
                              >
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
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
                          type={this.state.showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (<InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                                edge="end"
                                style={{ marginRight: "5px" }}
                              >
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
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
}

export default UserProfile;