import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Parallax from "../../components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import SectionContact from "./Sections/SectionContact";
import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionTabs from "./Sections/SectionTabs.js";
import SectionPills from "./Sections/SectionPills.js";
import SectionNotifications from "./Sections/SectionNotifications.js";
import SectionTypography from "./Sections/SectionTypography.js";
import SectionJavascript from "./Sections/SectionJavascript.js";
import SectionCarousel from "./Sections/SectionCarousel.js";
import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
import SectionLogin from "./Sections/SectionLogin.js";
import SectionExamples from "./Sections/SectionExamples.js";
import SectionDownload from "./Sections/SectionDownload.js";

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
          <SectionTypography />
        </div>
        <div id="features">
          <SectionExamples />
          <SectionDownload />
        </div>
        <div id="contact">
          <SectionContact />
        </div>
      </div>
      <Footer />
    </div>
  );
}
