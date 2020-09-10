import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import styleModule from "../UserProfile/style.module.css";
import UserService from "../../service/UserService";
import OrderService from "../../service/OrderService";
import {
  Alert,
  Modal
} from 'antd';
import { Row, Col, Card, ListGroupItem, ListGroup } from "react-bootstrap";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      role: "",
      table: null
    };
    this.getOrderDetails = this.getOrderDetails.bind(this);
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = async () => {
    const userEmail = localStorage.getItem("email");
    const role = await UserService.getUserRole(userEmail);
    let orders = [];
    if (role === "Admin") {
      orders = await OrderService.getAllOrders();
    } else if (role === "User") {
      orders = await OrderService.getOrdersByEmail(userEmail);
    }
    this.getTable(orders, role);
  }

  getTable = (orders, role) => {
    const tableData = [];
    orders.forEach(element => {
      const orderData = [];
      orderData.push(element.product.name);
      orderData.push(element.product.price);
      orderData.push(element.checkoutType);
      orderData.push(element.status);
      orderData.push(<Button style={{ marginRight: "-60px" }} onClick={() => this.getOrderDetails(element.id)} color="github" round>Detay</Button>);
      tableData.push(orderData);
    });
    console.log(orders.length)
    const tableHead = orders.length > 0 ? ["Urun Ismi", "Fiyat", "Odeme Sekli", "Durum"] :
      [<Alert style={{ textAlign: "center" }} message="Siparis Bulunamadi" type="warning" />];
    const table = (
      <Table
        tableHeaderColor="primary"
        tableHead={tableHead}
        tableData={tableData}
      />
    );

    this.setState({
      role: role,
      orders: orders,
      table: table,
    })
  }

  async getOrderDetails(orderId) {
    const order = await OrderService.getOrderById(orderId);
    Modal.info({
      title: <p className={styleModule.title} style={{ textAlign: "center" }}>Urun Detayi</p>,
      icon: "",
      okText: "Kapat",
      content: (
        <div style={{ textAlign: "center" }}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Row>
                  <Col>
                    <p className={styleModule.title2}>Urun ismi:</p>
                  </Col>
                  <Col>
                    <p className={styleModule.title2}>{order.product.name}</p>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <p className={styleModule.title2}>Urun kodu:</p>
                  </Col>
                  <Col>
                    <p className={styleModule.title2}>{order.product.code}</p>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <p className={styleModule.title2}>Urun aciklamasi:</p>
                  </Col>
                  <Col>
                    <p className={styleModule.title2}>{order.product.description}</p>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <p className={styleModule.title2}>Odeme Sekli:</p>
                  </Col>
                  <Col>
                    <p className={styleModule.title2}>{order.checkoutType}</p>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <p className={styleModule.title2}>Urun fiyati:</p>
                  </Col>
                  <Col>
                    <p className={styleModule.title2}>{order.product.price}</p>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <p className={styleModule.title2}>Durum:</p>
                  </Col>
                  <Col>
                    <p className={styleModule.title2}>{order.status}</p>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </div>
      ),
      onOk() { },
    });
  }

  render() {
    return (
      <GridContainer style={{ justifyContent: "center" }}>
        <GridItem xs={12} sm={12} md={9}>
          <Card className={styleModule.card}>
            <CardHeader color="primary">
              <h4 className={styleModule.cardTitleWhite}>Siparisler</h4>
              <p className={styleModule.cardCategoryWhite}>
                Siparislerinizi buradan takip edebilirsiniz
              </p>
            </CardHeader>
            <CardBody>
              {this.state.table}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default TableList;