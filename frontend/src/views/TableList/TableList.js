import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "DINSchrift",
    fontSize: "25px",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Siparisler</h4>
            <p className={classes.cardCategoryWhite}>
              Siparislerinizi buradan takip edebilirsiniz
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Urun Ismi", "Urun Kodu", "Aciklama", "Fiyat", "Durum"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "Yolda", <Button style={{marginRight: "-40px"}}color="github" round>Detay</Button>],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789", "Yolda",<Button style={{marginRight: "-40px"}}color="github" round>Detay</Button>],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142", "Yolda",<Button style={{marginRight: "-40px"}}color="github" round>Detay</Button>],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735", "Yolda",<Button style={{marginRight: "-40px"}}color="github" round>Detay</Button>],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542", "Yolda",<Button style={{marginRight: "-40px"}}color="github" round>Detay</Button>],
                ["Mason Porter", "Chile", "Gloucester", "$78,615", "Yolda", <Button style={{marginRight: "-40px"}}color="github" round>Detay</Button>]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
