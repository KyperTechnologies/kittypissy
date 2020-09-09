import React from "react";
import { useHistory } from "react-router";
import Button from "../../../components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import image from "../../../assets/img/faces/avatar.jpg";
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div style={{ paddingLeft: "0px" }} >
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
          <div style={{ marginBottom: "50px" }} className={classes.space50} />
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
          <div style={{ marginBottom: "50px" }} className={classes.space50} />
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
          <div className={classes.space50} />
        </div>
        <div style={{ marginBottom: "50px" }} className={classes.space50} />
        <div style={{ textAlign: "center" }} >
          <Button color="github" size="lg" round onClick={() => {
              history.push({
                pathname:  "/",
                state: "contact"
            });}}>
            Hemen iletişim kurun
          </Button>
        </div>
      </div>
    </div>
  );
}
