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
} from 'antd';
import { Row, Col, Card } from "react-bootstrap";

class TableList extends Component {
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
                <CustomButton fullWidth color="success"><span className={styleModule.title6}>Odeme Yap</span></CustomButton>
              </Row>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default TableList;