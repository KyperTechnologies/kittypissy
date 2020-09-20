import React, { Component } from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import styleModule from "../UserProfile/style.module.css";
import UserService from "../../service/UserService";
import OrderService from "../../service/OrderService";
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";
import EditIcon from '@material-ui/icons/Edit';
import { Modal, Form, Select, Button, Alert, message } from "antd";

const { Option } = Select;

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      role: "",
      table: null,
    };
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
    this.setState({
      role: role,
      orders: orders,
    });
  }

  setOrder = (order) => {
    const newOrders = this.state.orders;
    let index = -1;
    newOrders.forEach(element => {
      if (element.id === order.id) {
        index = newOrders.indexOf(element);
      }
    });
    
    if (index > -1) {
      newOrders.splice(index, 1);
      newOrders.push(order);
    }

    this.setState({
      orders: newOrders,
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
              <TableContainer>
                <Table aria-label="collapsible table">
                  <TableHead>
                    {this.state.role === "Admin" ? (
                      <TableRow>
                        <TableCell />
                        <TableCell>Urun Ismi</TableCell>
                        <TableCell align="center">Urun Kodu</TableCell>
                        <TableCell align="center">Fiyat</TableCell>
                        <TableCell align="center">Odeme Sekli</TableCell>
                        <TableCell align="center">Durum</TableCell>
                        <TableCell align="center">Guncelle</TableCell>
                      </TableRow>
                    ) : (
                        <TableRow>
                          <TableCell />
                          <TableCell>Urun Ismi</TableCell>
                          <TableCell align="center">Fiyat</TableCell>
                          <TableCell align="center">Odeme Sekli</TableCell>
                          <TableCell align="center">Durum</TableCell>
                        </TableRow>
                      )}
                  </TableHead>
                  <TableBody>
                    {this.state.orders.map((order) => (
                      <Row key={order.id} row={order} role={this.state.role} setOrder={this.setOrder}/>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row, role, setOrder } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const changeStatus = async (values) => {
    console.log(values);
    const jsonBody = {
      orderId: values.id,
      status: values.select,
    }
    const response = await OrderService.changeStatus(jsonBody);
    if (response === false) {
      message.error({
        content: "Guncelleme Basarisiz!",
        style: { marginTop: "100px" },
      });
    } else {
      message.success({
        content: "Guncelleme Basarili!",
        style: { marginTop: "100px" },
      });
      setOrder(response);
      Modal.destroyAll();
    }
  }

  const changeStatusModal = (defaultValue, orderId) => {
    Modal.info({
      icon: "",
      okText: "Kapat",
      okType: "danger",
      centered: "true",
      content: (
        <Form onFinish={changeStatus}>
          <Form.Item
            name="id"
            initialValue={orderId} />
          <Form.Item
            name="select"
            label="Seciniz"
            initialValue={defaultValue}
            rules={[{ required: true, message: (<Alert style={{ marginTop: "10px", marginBottom: "10px" }} message="Lutfen secim yapiniz" type="error" />) }]}
          >
            <Select defaultValue={defaultValue} placeholder="Lutfen secim yapiniz">
              <Option value="Siparis Alindi">Siparis Alindi</Option>
              <Option value="Hazirlaniyor">Hazirlaniyor</Option>
              <Option value="Kargoya Verildi">Kargoya Verildi</Option>
              <Option value="Teslim Edildi">Teslim Edildi</Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              Guncelle
          </Button>
          </Form.Item>
        </Form>
      )
    });
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.product.name}
        </TableCell>
        {role === "Admin" ? <TableCell align="center">{row.product.code}</TableCell> : (null)}
        <TableCell align="center">{row.product.price} ₺</TableCell>
        <TableCell align="center">{row.checkoutType}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        {role === "Admin" ? <IconButton onClick={() => changeStatusModal(row.status, row.id)}>
          <EditIcon />
        </IconButton> : (null)}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detay
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {role === "Admin" ? (
                    <TableRow>
                      <TableCell align="center">Isim</TableCell>
                      <TableCell align="center">Soyisim</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Adres</TableCell>
                      <TableCell align="center">Sehir</TableCell>
                      <TableCell align="center">Zip Kodu</TableCell>
                      <TableCell align="center">Telefon</TableCell>
                    </TableRow>) : (
                      <TableRow>
                        <TableCell align="center">Urun Resmi</TableCell>
                        <TableCell align="center">Urun Adi</TableCell>
                        <TableCell align="center">Urun Fiyati</TableCell>
                        <TableCell align="center">Urun Kodu</TableCell>
                        <TableCell align="center">Urun Aciklamasi</TableCell>
                        <TableCell align="center">Durum</TableCell>
                        <TableCell align="center">Odeme Sekli</TableCell>
                      </TableRow>
                    )}
                </TableHead>
                {role === "Admin" ? (
                  <TableBody>
                    <TableRow key={row.buyer.id}>
                      <TableCell align="center">{row.buyer.name}</TableCell>
                      <TableCell align="center">{row.buyer.surName}</TableCell>
                      <TableCell align="center">{row.buyer.email}</TableCell>
                      <TableCell align="center">{row.buyer.adress}</TableCell>
                      <TableCell align="center">{row.buyer.country}</TableCell>
                      <TableCell align="center">{row.buyer.zipcode}</TableCell>
                      <TableCell align="center">{row.buyer.phone}</TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                    <TableBody>
                      <TableRow key={row.product.id}>
                        <TableCell component="th" scope="row">
                          <img style={{ width: "60px" }} variant="top" src={`data:image/jpeg;base64,${row.product.image}`} alt="img" />
                        </TableCell>
                        <TableCell align="center">{row.product.name}</TableCell>
                        <TableCell align="center">{row.product.price} ₺</TableCell>
                        <TableCell align="center">{row.product.code}</TableCell>
                        <TableCell align="center">{row.product.description}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">{row.checkoutType}</TableCell>
                      </TableRow>
                    </TableBody>
                  )}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};


export default Order;