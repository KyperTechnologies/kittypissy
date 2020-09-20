import React, { Component } from "react";
import CustomButton from "../../components/CustomButtons/Button.js";
import Button from '@material-ui/core/Button';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import styleModule from "../UserProfile/style.module.css";
import {
  Alert,
  Modal,
  Badge,
  Form,
} from 'antd';
import { Row, Col, Card } from "react-bootstrap";
import UserService from "../../service/UserService";
import OrderService from "../../service/OrderService";
import TextField from '@material-ui/core/TextField';
import PaymentIcon from '@material-ui/icons/Payment';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      role: "",
      cartData: null,
    };
  }

  componentDidMount() {
    this.getCart();
    this.getTotalPrice();
  }

  order = (product) => {
    let cart = localStorage.getItem("cart") === null ? [] : JSON.parse(localStorage.getItem("cart"));
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    this.props.handleCartData(cart);
  }

  deleteFromCart = (product) => {
    const cart = localStorage.getItem("cart") === null ? [] : JSON.parse(localStorage.getItem("cart"));
    let index = -1;
    cart.forEach(element => {
      if (element.id === product.id) {
        index = cart.indexOf(element);
      }
    });
    if (index > -1) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.props.handleCartData(cart);
  }

  getTotalPrice = () => {
    let totalPrice = 0;
    this.state.orders.forEach(element => {
      totalPrice = totalPrice + element.price;
    });
    return totalPrice;
  }

  getCart = () => {
    const cart = localStorage.getItem("cart") === null ? [] : JSON.parse(localStorage.getItem("cart"));
    this.getTable(cart);
  }

  setCountPlus = (product) => {
    this.order(product)
  }

  setCountMinus = (product) => {
    this.deleteFromCart(product);
  }

  filterArray = (cart) => {
    return cart.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
  }

  findCount = (cart, id) => {
    let count = 0;
    cart.forEach((element) => {
      if (element.id === id) {
        count++;
      }
    });
    return count;
  }

  getTable = (cart, role) => {
    let cartData = [];
    const filteredArr = this.filterArray(cart);
    if (filteredArr.length === 0) {
      cartData.push(<Alert style={{ marginTop: "10px" }} message="Sepetinizde Urun Bulunamadi" type="warning" />)
    }

    filteredArr.forEach(element => {
      if (cartData.length !== 0) {
        cartData.push(<div className={styleModule.line} />)
      }
      let product = (
        <Row>
          <Col md={4}>
            <Card.Img variant="top" src={`data:image/jpeg;base64,${element.image}`} />
          </Col>
          <Col md={4} style={{ textAlign: "left", alignSelf: "self-end" }}>
            <p className={styleModule.title4}>{element.name}</p>
            <div className={styleModule.line3} />
            <p className={styleModule.title3}>{element.price} ₺</p>
          </Col>
          <Col md={4} style={{ textAlign: "left", alignSelf: "center" }}>
            <Button
              aria-label="reduce"
              onClick={() => {
                this.setCountMinus(element);
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Badge style={{ fontSize: "20px" }} count={this.findCount(cart, element.id)} />
            <Button
              aria-label="increase"
              onClick={() => {
                this.setCountPlus(element);
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </Col>
        </Row>);
      cartData.push(product);
    });

    this.setState({
      role: role,
      orders: cart,
      cartData: cartData
    });
  }

  checkOutForm = async () => {
    const userEmail = localStorage.getItem("email");
    const userDetails = await UserService.getUserDetails(userEmail);

    Modal.info({
      icon: "",
      okText: "Kapat",
      okType: "danger",
      centered: true,
      width: "750px",
      content: (
        <Card>
          <CardBody>
            <Form onFinish={this.checkout}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h1 className={styleModule.title5} style={{ marginBottom: "25px" }}>Kullanici Bilgileri</h1>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Form.Item
                    name={['adress', 'name']}
                    initialValue={userDetails.name}
                    rules={[{ required: true, message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Isim girilmesi zorunludur" type="error" /> }]}
                  >
                    <TextField
                      variant="outlined"
                      defaultValue={userDetails.name}
                      fullWidth
                      label="Isim"
                      autoFocus
                    />
                  </Form.Item>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Form.Item
                    name={['adress', 'surname']}
                    initialValue={userDetails.surname}
                    rules={[{ required: true, message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Soyisim girilmesi zorunludur" type="error" /> }]}
                  >
                    <TextField
                      variant="outlined"
                      defaultValue={userDetails.surname}
                      fullWidth
                      label="Soyisim"
                      autoFocus
                    />
                  </Form.Item>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Form.Item
                    name={['adress', 'email']}
                    initialValue={userDetails.email}
                    rules={[{ required: true, message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Email girilmesi zorunludur" type="error" /> },
                    {
                      type: "email",
                      message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Gecerli bir Email giriniz" type="error" />
                    }]}
                  >
                    <TextField
                      variant="outlined"
                      defaultValue={userDetails.email}
                      fullWidth
                      label="Email"
                      autoFocus
                      disabled
                    />
                  </Form.Item>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Form.Item
                    name={['adress', 'phone']}
                    initialValue={userDetails.phone}
                    rules={[{ required: true, message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Telefon No girilmesi zorunludur" type="error" /> }, { pattern: "^[0-9]+$", message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Lutfen gecerli bir Kart Numarisi giriniz" type="error" /> }]}
                  >
                    <TextField
                      variant="outlined"
                      defaultValue={userDetails.phone}
                      fullWidth
                      label="Telefon No"
                      autoFocus
                    />
                  </Form.Item>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Form.Item
                    name={['adress', 'country']}
                    initialValue={userDetails.country}
                    rules={[{ required: true, message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Sehir girilmesi zorunludur" type="error" /> }]}
                  >
                    <TextField
                      variant="outlined"
                      defaultValue={userDetails.country}
                      fullWidth
                      label="Sehir"
                      autoFocus
                    />
                  </Form.Item>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Form.Item
                    name={['adress', 'zipcode']}
                    initialValue={userDetails.zipcode}
                    rules={[{ required: true, message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Zip Kodu girilmesi zorunludur" type="error" /> }, { pattern: "^[0-9]+$", message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Lutfen gecerli bir Kart Numarisi giriniz" type="error" /> }]}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      defaultValue={userDetails.zipcode}
                      label="Zip Kodu"
                      autoFocus
                    />
                  </Form.Item>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Form.Item
                    name={['adress', 'adress']}
                    initialValue={userDetails.adress}
                    rules={[{ required: true, message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Adres girilmesi zorunludur" type="error" /> }]}
                  >
                    <TextField
                      label="Adres"
                      variant="outlined"
                      fullWidth
                      defaultValue={userDetails.adress}
                      multiline
                      rows={5}
                    />
                  </Form.Item>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Form.Item
                    name={['adress', 'idendityNo']}
                    initialValue={userDetails.idendityNo}
                    rules={[{ required: true, message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="TC No girilmesi zorunludur" type="error" /> }, { pattern: "^[0-9]{11}$", message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Lutfen gecerli bir Kart Numarisi giriniz" type="error" /> }]}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="TC No"
                    />
                  </Form.Item>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h1 className={styleModule.title5} style={{ marginBottom: "25px" }}>Odeme Bilgileri</h1>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Form.Item
                    name={['cart', 'cardNumber']}
                    hasFeedback
                    rules={[{ required: true, message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Zorunlu alan" type="error" /> }, { pattern: "^[0-9]{16}$", message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Gecersiz giris" type="error" /> }]}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Kart Numarasi"
                      autoFocus
                    />
                  </Form.Item>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Form.Item
                    name={['cart', 'expireMonth']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Zorunlu alan" type="error" />
                      }, { pattern: "^[0-9]{2}$", message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Gecersiz giris" type="error" /> },
                    ]}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Ay"
                      autoFocus
                    />
                  </Form.Item>

                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Form.Item
                    hasFeedback
                    name={['cart', 'expireYear']}
                    rules={[
                      {
                        required: true,
                        message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Zorunlu alan" type="error" />
                      }, { pattern: "^[0-9]{2}$", message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Gecersiz giris" type="error" /> },
                    ]}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Yil"
                      autoFocus
                    />
                  </Form.Item>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={9}>
                  <Form.Item
                    name={['cart', 'holderName']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Zorunlu alan" type="error" />
                      },
                    ]}

                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Kart Uzerindeki Isim"
                    />
                  </Form.Item>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Form.Item
                    name={['cart', 'cvc']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Zorunlu alan" type="error" />
                      }, { pattern: "^[0-9]{3}$", message: <Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Gecersiz giris" type="error" /> },
                    ]}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="CVC"
                      autoFocus
                    />
                  </Form.Item>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomButton type="submit" color="success" fullWidth><PaymentIcon />ODE</CustomButton>
                </GridItem>
              </GridContainer>
            </Form >
          </CardBody>
        </Card>
      )
    });
  }

  checkout = async (values) => {
    const jsonBody = {
      name: values.adress.name,
      surname: values.adress.surname,
      email: values.adress.email,
      phone: values.adress.phone,
      country: values.adress.country,
      zipcode: values.adress.zipcode,
      adress: values.adress.adress,
      idendityNo: values.adress.idendityNo,
      cardNumber: values.cart.cardNumber,
      expireMonth: values.cart.expireMonth,
      expireYear: values.cart.expireYear,
      holderName: values.cart.holderName,
      cvc: values.cart.cvc,
      price: this.getTotalPrice(),
    }
    const response = await OrderService.order(jsonBody);
    console.log(response);
  }

  render() {
    return (
      <GridContainer style={{ justifyContent: "center" }}>
        <GridItem xs={12} sm={12} md={6}>
          <Card className={styleModule.card}>
            <CardHeader color="primary">
              <h4 className={styleModule.cardTitleWhite}>Sepetim</h4>
            </CardHeader>
            <CardBody>
              {this.state.cartData}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={styleModule.card}>
            <CardHeader color="primary">
              <p className={styleModule.cardTitleWhite}>Siparis Ver</p>
            </CardHeader>
            {this.getTotalPrice() > 0 ? (
              <CardBody>
                <Row>
                  <Col md={7} style={{ textAlign: "left", marginLeft: "20px" }}>
                    <p className={styleModule.title5}>Sepet Toplami</p>
                  </Col>
                  <Col md={4}>
                    <p className={styleModule.title5} style={{ color: "green" }}>{this.getTotalPrice()} ₺</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={7} style={{ textAlign: "left", marginLeft: "20px" }}>
                    <p className={styleModule.title5}>Kargo Ucreti</p>
                  </Col>
                  <Col md={4}>
                    <p className={styleModule.title5} style={{ color: "green" }}>10 ₺</p>
                  </Col>
                </Row>
                <Row style={{ textAlign: "left", marginLeft: "2px", marginTop: "10px" }}>
                  <AddIcon />
                </Row>
                <div className={styleModule.line2} />
                <Row>
                  <Col md={7} style={{ textAlign: "left", marginLeft: "20px" }}>
                    <p className={styleModule.title5}>Odenecek Tutar</p>
                  </Col>
                  <Col md={4}>
                    <p className={styleModule.title5} style={{ color: "green" }}>{(this.getTotalPrice() + 10)} ₺</p>
                  </Col>
                </Row>
                <Row>
                  <CustomButton fullWidth color="success" onClick={() => this.checkOutForm()}><span className={styleModule.title6}>Odeme Yap</span></CustomButton>
                </Row>
              </CardBody>) : (
                <CardBody>
                  <Alert style={{ marginTop: "10px" }} message="Lutfen sepetinize urun ekleyiniz" type="warning" />
                </CardBody>
              )}
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default Cart;