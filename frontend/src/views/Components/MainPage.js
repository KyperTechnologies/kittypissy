import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import SectionContactForm from "./Sections/SectionContactForm";
import SectionProducts from "./Sections/SectionProducts.js";
import SectionFeatures from "./Sections/SectionFeatures.js";
import SectionFeatureDetail from "./Sections/SectionFeatureDetail.js";
import styles from "../../assets/jss/material-kit-react/views/components.js";
import styleModule from "../Components/Sections/style.module.css";

const useStyles = makeStyles(styles);

export default function MainPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        isMain={true}
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <div id="home">
        <Parallax image={require("../../assets/img/bg4.png")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div style={{ marginTop: "220px" }} className={classes.brand}>
                  <h1 className={styleModule.title2}>EN IYI <br></br>ARKADASINIZ<br></br> ICIN EN IYISI</h1>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      </div>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div id="shop">
          <SectionProducts/>
        </div>
        <div id="features">
          <SectionFeatures/>
          <SectionFeatureDetail/>
        </div>
        <div id="contact">
          <SectionContactForm/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
