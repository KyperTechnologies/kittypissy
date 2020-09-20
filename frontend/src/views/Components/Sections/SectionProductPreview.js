import React from "react";
import styleModule from "./style.module.css"
import Button from "../../../components/CustomButtons/Button.js";
import { NavLink } from "react-bootstrap"
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import ProductService from "../../../service/ProductService";
import { Card } from "react-bootstrap";
import ListGroupItem from 'react-bootstrap/ListGroupItem'

const useStyles = makeStyles(styles);

export default function SectionTypography(props) {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  const [isProductSet, setisProductSet] = React.useState(false);

  React.useEffect(() => {
    const getPreviewProducts = async () => {
      const product = await ProductService.getPreviewProducts();
      setProducts(product);
      setisProductSet(true);
    }
    if (!isProductSet) {
      getPreviewProducts();
    }
  }, [products, isProductSet]);

  const getProductView = () => {
    const productView = [];
    products.forEach((element) => {
      productView.push(
        <GridItem xs={12} sm={3}>
          <Card className={styleModule.card}>
            <Card.Img variant="top" src={`data:image/jpeg;base64,${element.image}`} />
            <Card.Body>
              <Card.Title className={styleModule.title} style={{ fontSize: "18px", textAlign: "center", marginBottom: "-85px" }}>{String(element.name)}</Card.Title>
            </Card.Body>
            <div className={styleModule.line4} />
            <Card.Title className="list-group-flush">
              <ListGroupItem className={styleModule.title4} style={{ fontSize: "30px", textAlign: "center", marginBottom: "-40px" }}>{element.price} ₺</ListGroupItem>
            </Card.Title>
            <Card.Body style={{ marginTop: "10px" }}>
              <Button variant="contained" color="github" href="/giris">
                Siparis Ver
                     </Button>
            </Card.Body>
          </Card>
        </GridItem>);
    });
    return productView;
  }

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div style={{ paddingLeft: "0px" }} >
          <h2 className={styleModule.title}>URUNLERIMIZ</h2>
        </div>
        <div className={classes.space50} />
        <div id="images">
          <GridContainer>
            {getProductView()}
          </GridContainer>
          <GridContainer />
          <div style={{ marginBottom: "50px" }} className={classes.space50} />
          <Button color="github" size="large" round
          ><NavLink
            href="/giris"
            className={styleModule.navLink}
          >Daha Fazlası İçin Tıklayın</NavLink></Button>
        </div>
        <div style={{ textAlign: "center" }} >
          <div className={styleModule.line}></div>
        </div>
      </div>
    </div>
  );
}
