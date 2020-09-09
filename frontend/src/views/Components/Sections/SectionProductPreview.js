import React from "react";
import styleModule from "./style.module.css"
import Button from "../../../components/CustomButtons/Button.js";
import {NavLink}  from "react-bootstrap"
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import image from "../../../assets/img/faces/avatar.jpg";
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function SectionTypography(props) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div style={{ paddingLeft: "0px" }} >
          <h2 className={styleModule.title}>URUNLERIMIZ</h2>
        </div>
        <div className={classes.space50} />
        <div id="images">
          <GridContainer>
            <GridItem xs={12} sm={2}>
              <h4>item1</h4>
              <img
                src={image}
                alt="..."
                className={classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid}
              />
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.marginLeft}>
              <h4>item2</h4>
              <img
                src={image}
                alt="..."
                className={classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid}
              />
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.marginLeft}>
              <h4>item3</h4>
              <img
                src={image}
                alt="..."
                className={classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid}
              />
            </GridItem>
            <GridItem xs={12} sm={2} className={classes.marginLeft}>
              <h4>item4</h4>
              <img
                src={image}
                alt="..."
                className={classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid}
              />
            </GridItem>
          </GridContainer>
          <GridContainer />
          <div style={{ marginBottom: "50px" }} className={classes.space50} />
          <Button color="github" size="lg" round
          ><NavLink
            href="/urunler"
            className={styleModule.navLink}
          >Daha Fazlası İçin Tıklayın</NavLink></Button>
        </div>
        <div className={classes.space50} />
        <div style={{ textAlign: "center" }} >
          <div className={styleModule.line}></div>
        </div>
      </div>
    </div>
  );
}
