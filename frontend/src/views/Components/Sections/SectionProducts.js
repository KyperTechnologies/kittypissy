import React, { Component } from "react";
import Button from "../../../components/CustomButtons/Button.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ProductService from "../../../service/ProductService";
import UserService from "../../../service/UserService";
import Card from "react-bootstrap/Card";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import GridItem from "../../../components/Grid/GridItem.js";
import styleModule from "./style.module.css";
import { Row, Col } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import {
  Alert,
  Upload,
  Button as AntButton,
  Modal,
  Form,
  message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

class SectionProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      role: "",
      fileList: [],
    };
  }

  componentDidMount() {
    this.createProductList();
  }

  order = (productId) => {
    console.log(productId);
  }

  deleteProduct = async (productId) => {
    console.log(productId);
    await ProductService.deleteProduct(productId);
    window.location.reload();
  }

  updateImage = async (values) => {
    const form = new FormData();
    console.log(values.product);
    form.append("productId", values.product.id);
    form.append("file", values.product.image.file);
    await ProductService.updateProductImage(form)
      .then((response) => {
        this.setState({
          product: response,
        });
        window.location.reload();
      })
  }

  updateProduct = async (values) => {
    console.log(values);
    const form = new FormData();
    console.log(values.product);
    form.append("productId", values.product.id);
    form.append("name", values.product.name);
    form.append("code", values.product.code);
    form.append("description", values.product.desc);
    form.append("price", values.product.price);
    await ProductService.updateProduct(form)
      .then((response) => {
        this.setState({
          product: response,
        });
        window.location.reload();
      });
  }

  handleChange = info => {
    let fileList = [...info.fileList];
    this.setState({ fileList });
    message.success(`${info.file.name} file uploaded successfully`);
  };

  updateProductImage = async (productId) => {
    const product = await ProductService.getProductById(productId);
    const props = {
      beforeUpload: file => {
        return false;
      },
      onChange: this.handleChange,
      multiple: true,
    };
    Modal.info({
      icon: "",
      okText: "Kapat",
      okType: "danger",
      centered: "true",
      content: (
        <GridContainer style={{ justifyContent: "center" }}>
          <GridItem md={12}>
            <Form
              layout="vertical"
              name="profile"
              initialValues={{
                remember: true,
              }}
              onFinish={this.updateImage}>
              <Form.Item
                name={['product', 'id']}
                initialValue={product.id}
              ></Form.Item>
              <Card>
                <CardHeader color="primary">
                  <h4 className={styleModule.cardTitleWhite} style={{ textAlign: "center" }}>Resim Guncelleme</h4>
                </CardHeader>
                <CardBody style={{ marginTop: "20px" }}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card.Img variant="top" src={`data:image/jpeg;base64,${product.image}`} />
                      <GridContainer style={{ marginTop: "20px" }}>
                        <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
                          <Form.Item
                            name={['product', 'image']}
                            initialValue={product.image}
                          >
                            <Upload
                              {...props}
                              fileList={this.state.fileList}
                              listType="picture"
                            >
                              <AntButton size="large" icon={<UploadOutlined />}>Urun Resmi Ekle</AntButton>
                            </Upload>
                          </Form.Item>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{ justifyContent: "center" }}>
                  <Button type="submit" color="twitter">Guncelle</Button>
                </CardFooter>
              </Card>
            </Form>
          </GridItem>
        </GridContainer>),
      onOk() { },
    });
  }
  updateProductModal = async (productId) => {
    const product = await ProductService.getProductById(productId);
    Modal.info({
      icon: "",
      okText: "Kapat",
      okType: "danger",
      centered: "true",
      content: (
        <GridContainer style={{ justifyContent: "center" }}>
          <GridItem md={12}>
            <Form
              layout="vertical"
              name="profile"
              initialValues={{
                remember: true,
              }}
              onFinish={this.updateProduct}>
              <Form.Item
                name={['product', 'id']}
                initialValue={product.id}
              ></Form.Item>
              <Card>
                <CardHeader color="primary">
                  <h4 className={styleModule.cardTitleWhite} style={{ textAlign: "center" }}>Urun Guncelle</h4>
                </CardHeader>
                <CardBody style={{ marginTop: "20px" }}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Form.Item
                        name={['product', 'code']}
                        initialValue={product.code}
                        rules={[
                          {
                            required: true,
                            message: (<Alert style={{ marginTop: "10px" }} message="Urun kodu giriniz" type="error" />)
                          }
                        ]}
                      >
                        <TextField
                          label="Urun Kodu"
                          defaultValue={product.code}
                          fullWidth
                        />
                      </Form.Item>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Form.Item
                        name={['product', 'name']}
                        initialValue={product.name}
                        rules={[
                          {
                            required: true,
                            message: (<Alert style={{ marginTop: "10px" }} message="Urun ismi giriniz" type="error" />)
                          }
                        ]}
                      >
                        <TextField
                          label="Urun Ismi"
                          defaultValue={product.name}
                          fullWidth
                        />
                      </Form.Item>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Form.Item
                        name={['product', 'price']}
                        initialValue={product.price}
                        rules={[
                          {
                            required: true,
                            message: (<Alert style={{ marginTop: "10px" }} message="Fiyat giriniz" type="error" />)
                          },
                          {
                            pattern: /^[0-9]+$/,
                            message: (<Alert style={{ marginTop: "10px" }} message="Lutfen sayi giriniz" type="error" />)
                          }
                        ]}
                      >
                        <TextField
                          label="Urunun Fiyati"
                          defaultValue={product.price}
                          fullWidth
                        />
                      </Form.Item>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Form.Item
                        name={['product', 'desc']}
                        initialValue={product.description}
                        rules={[
                          {
                            required: true,
                            message: (<Alert style={{ marginTop: "10px" }} message="Aciklama giriniz" type="error" />)
                          }
                        ]}
                      >
                        <TextField
                          label="Urun Aciklamasi"
                          defaultValue={product.description}
                          id="desc"
                          multiline
                          rows={5}
                          fullWidth
                        />
                      </Form.Item>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{ justifyContent: "center" }}>
                  <Button type="submit" color="twitter">Guncelle</Button>
                </CardFooter>
              </Card>
            </Form>
          </GridItem>
        </GridContainer>
      ),
      onOk() { },
    });
  }

  createProducts = (productList, role) => {
    console.log(productList);
    let column = [];
    let row = [];
    productList.forEach(element => {
      column.push(
        <Col md={4}>
          <Card className={styleModule.card}>
            <Card.Img variant="top" src={`data:image/jpeg;base64,${element.image}`} />
            {role === "Admin" ? (
              <Card.Body>
                <Button variant="contained" color="facebook" onClick={() => this.updateProductImage(element.id)}>
                  Urun Resmi guncelle
                </Button>
              </Card.Body>) : (null)}
            <Card.Body>
              <Card.Title className={styleModule.title} style={{ fontSize: "18px", textAlign: "left", marginBottom: "-85px" }}>{String(element.name)}</Card.Title>
            </Card.Body>
            <Card.Title className="list-group-flush">
              <ListGroupItem className={styleModule.title4} style={{ fontSize: "35px", textAlign: "left", marginBottom: "-40px" }}>{element.price} ₺</ListGroupItem>
            </Card.Title>
            <Card.Body>
              {role === "User" ? (
              <Row><Col md={5}><Button variant="contained" color="transparent" onClick={() => this.order(element.id)}>
                     Detaylar
                     </Button> 
                    </Col>
                    <Col md={5}><Button variant="contained" color="google" onClick={() => this.order(element.id)}>
                     Sepete ekle
                     </Button>
                    </Col></Row>
              ) : (
                  <div>
                    <Button variant="contained" color="google" onClick={() => this.deleteProduct(element.id)}>
                      Urunu Sil
                      </Button>
                    <Button variant="contained" color="twitter" onClick={() => this.updateProductModal(element.id)}>
                      Guncelle
                      </Button>
                  </div>
                )
              }
            </Card.Body>
          </Card>
        </Col>
      );
      if (column.length % 3 === 0) {
        row.push(
          <Row style={{ marginBottom: "40px" }}>
            {column}
          </Row>);
        column = [];
      }
    });
    if (column.length > 0) {
      row.push(
        <Row style={{ marginBottom: "40px" }}>
          {column}
        </Row>);
      column = [];
    }
    this.setState({
      products: row,
    });
  }

  createProductList = async () => {
    const email = localStorage.getItem("email");
    const productList = await ProductService.getAllProducts();
    const role = await UserService.getUserRole(email);
    this.createProducts(productList, role);
  }

  render() {
    return (
      <div>
        <div>
          <div style={{ paddingLeft: "0px" }} >
          </div>
          <div />
          <div id="images">
            <GridContainer style={{ justifyContent: "center" }}>
              <GridItem xs={12} sm={12} md={11}>
                <Card className={styleModule.card}>
                  <CardHeader color="primary">
                    <h4 className={styleModule.cardTitleWhite}>Urunler</h4>
                    <p className={styleModule.cardCategoryWhite}>
                      Begendiginiz urunleri buradan sepetinize ekleyebilirsiniz
                    </p>
                  </CardHeader>
                  <CardBody>
                    <div style={{ marginTop: "40px" }}>
                      {this.state.products}
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
            <div />
          </div>
          <div style={{ marginBottom: "50px" }} />
        </div>
      </div>
    );

  }

}
export default SectionProducts;