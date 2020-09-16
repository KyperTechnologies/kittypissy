import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import styleModule from "../UserProfile/style.module.css";
import {
  Alert,
  Modal
} from 'antd';
import { Row, Col, Card } from "react-bootstrap";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      role: "",
      table: null
    };
  }

  componentDidMount() {
    this.getCart();
  }

  getCart = () => {
    const cart = localStorage.getItem("cart") === null ? [] : JSON.parse(localStorage.getItem("cart"));
    this.getTable(cart);
  }

  getTable = (cart, role) => {
    const tableData = [];
    cart.forEach(element => {
      const cartData = [];
      cartData.push(element.name);
      cartData.push(element.code);
      tableData.push(cartData);
    });
    const tableHead = cart.length > 0 ? ["Urun Ismi", "Fiyat", "Odeme Sekli", "Durum"] :
      [<Alert style={{ textAlign: "center" }} message="Sepetinizde Urun Bulunamadi" type="warning" />];
    const table = (
      <Table
        tableHeaderColor="primary"
        tableHead={tableHead}
        tableData={tableData}
      />
    );

    this.setState({
      role: role,
      orders: cart,
      table: table,
    })
  }

  render() {
    return (
      <GridContainer style={{ justifyContent: "center" }}>
        <GridItem xs={12} sm={12} md={9}>
          <Card className={styleModule.card}>
            <CardHeader color="primary">
              <h4 className={styleModule.cardTitleWhite}>Sepetim</h4>
              <p className={styleModule.cardCategoryWhite}>
                Sepetinizdeki urunleri buradan siparis verebilirsiniz
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