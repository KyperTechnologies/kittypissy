import React, { Component } from "react";
import { useHistory } from "react-router";
import Button from "../../../components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import image from "../../../assets/img/faces/avatar.jpg";
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ProductService from "../../../service/ProductService";
import { assign } from "nodemailer/lib/shared";

const useStyles = makeStyles(styles);

class SectionProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.createProductList();
  }

  createRow = () => {

  }
  createColumn = (productList) => {
    console.log(productList);
    let column=[]
    productList.forEach(element => {
        column.push(
          <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text>
                    {element.description}
              </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Kilo</ListGroupItem>
                  <ListGroupItem>{element.price}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Button variant="contained" color="danger" href="#contained-buttons">
                    Sepete Ekle
              </Button>
                </Card.Body>
              </Card>
        )
    });
    this.setState({
      products : column,
    });
  }
  createProductList = async () => {

    const productList = await ProductService.getAllProducts();
    this.createColumn(productList);
  }
  render() {
    return (
      <div>
        <div>
          <div style={{ paddingLeft: "0px" }} >
          </div>
          <div />
          <div id="images">
            <GridContainer>
              {this.state.products}
            </GridContainer>
            <div />
          </div>
          <div style={{ marginBottom: "50px" }} />
          <div style={{ textAlign: "center" }} >
          </div>
        </div>
      </div>
    );

  }

}
export default SectionProducts;