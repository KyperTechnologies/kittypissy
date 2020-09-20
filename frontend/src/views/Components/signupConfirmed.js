import React from 'react'
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";

export default function signupConfirmed(props) {
  const { ...rest } = props;
  return (
    <div>
      <Header
        isMain={false}
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}>
      </Header>
      <GridContainer style={{ justifyContent: "center" }}>
        <GridItem md={4}>
          <Card style={{ marginTop: "200px"}}>
            <h4 style={{marginTop: "50px"}}>Kaydınız başarı ile alınmıştır!</h4>
            <p style={{marginTop: "20px"}}>Giriş yapmak için tıklayınız...</p>
            <CardFooter style={{ justifyContent: "center",marginBottom:"50px" }}>
              <Button href="/giris" color="github" round>GIRIS YAP</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
