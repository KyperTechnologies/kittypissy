/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Button from "../../../components/CustomButtons/Button.js";
import tick from "../../../assets/img/tick.png";
// core components
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/downloadStyle.js";
import styleModule from "./style.module.css"
import { Link } from "react-scroll";

const useStyles = makeStyles(styles);

export default function SectionDownload() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer className={classes.textCenter} justify="center">
          <GridItem xs={12} sm={12} md={9}>
            <h2 className={styleModule.title}>Neden bu ürünü seçmeliyim?</h2>
            <p className={styleModule.title4} style={{ textAlign: "left", lineHeight: "50px", fontSize: "17px", marginBottom: "50px" }}>
              <br /><img src={tick} alt="..." style={{ width: "20px", marginRight: "20px", marginBottom: "4px" }}></img>Bakterilerden arındırılmış ve bakteri tutmayan anti bakteriyel özelliğe sahip hijyenik ürünler.
            <br /><img src={tick} alt="..." style={{ width: "20px", marginRight: "20px", marginBottom: "4px" }}></img>Tozmayan ve size rahatsızlık vermeyecek şekilde üretilmiş.
            <br /><img src={tick} alt="..." style={{ width: "20px", marginRight: "20px", marginBottom: "4px" }}></img>Sıvı emme kapasitesi yüksek kum yapısı ile oluşacak koku ve bakterilere güle güle.
            <br /><img src={tick} alt="..." style={{ width: "20px", marginRight: "20px", marginBottom: "4px" }}></img>Kenarları,eşeleme sırasında kedinizin patilerine zarar vermeyecek türden üretilmiş kum tanecikleri.
            <br /><img src={tick} alt="..." style={{ width: "20px", marginRight: "20px", marginBottom: "4px" }}></img>Kolay topaklanma özelliği ile tam ekonomik kum çeşitleri.
            </p>
            <Button color="github" size="lg" round><Link activeClass="active"
              to="contact"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
            >                Hemen iletişim kurun
            </Link>
            </Button>
          </GridItem>
          <GridItem xs={12} sm={8} md={6}>
            {/*<Button
              color="primary"
              size="lg"
              href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-download-section"
              target="_blank"
            >
              Free React Download
            </Button>

            <Button
              color="primary"
              size="lg"
              href="https://www.creative-tim.com/product/material-kit?ref=mkr-download-section"
              target="_blank"
            >
              Free HTML Downoad
            </Button> *  */}
          </GridItem>
        </GridContainer>
        <br />
        <br />
        {/*        <GridContainer className={classes.textCenter} justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2>Want more?</h2>
            <h4>
              We{"'"}ve launched{" "}
              <a
                href="https://www.creative-tim.com/product/material-kit-pro-react?ref=mkr-download-section"
                target="_blank"
              >
                Material Kit PRO React{" "}
              </a>
              .It has a huge number of components, sections and example pages.
              Start Your Development With A Badass Material-UI nspired by
              Material Design.
            </h4>
          </GridItem>
          <GridItem xs={12} sm={8} md={6}>
            <Button
              color="rose"
              size="lg"
              href="https://www.creative-tim.com/product/material-kit-pro-react?ref=mkr-download-section"
              target="_blank"
            >
              Material Kit PRO
            </Button>
            <Button
              color="rose"
              size="lg"
              href="https://www.creative-tim.com/product/material-dashboard-pro-react?ref=mkr-download-section"
              target="_blank"
            >
              Material Dashboard PRO
            </Button>
          </GridItem>
        </GridContainer>  */}
        {/*
         <div className={classes.textCenter + " " + classes.sharingArea}>
          <GridContainer justify="center">
            <h3>Thank you for supporting us!</h3>
          </GridContainer>
          <Button color="twitter">
            <i className={classes.socials + " fab fa-twitter"} /> Tweet
          </Button>
          <Button color="facebook">
            <i className={classes.socials + " fab fa-facebook-square"} /> Share
          </Button>
          <Button color="google">
            <i className={classes.socials + " fab fa-google-plus-g"} />
            Share
          </Button>
          <Button color="github">
            <i className={classes.socials + " fab fa-github"} /> Star
          </Button>
        </div>  */}
          <div className={styleModule.line}></div>
      </div>
    </div>
  );
}
