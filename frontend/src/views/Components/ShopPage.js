import React, { Component } from 'react'
import SectionCarousel from './Sections/SectionCarousel'
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Footer from "../../components/Footer/Footer.js";
import styles from "../../assets/jss/material-kit-react/views/components.js";
import Parallax from '../../components/Parallax/Parallax';
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import styleModule from "../Components/Sections/style.module.css";
import { useHistory } from "react-router"
import Button from "../../components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

export default function ShopPage(props) {
    const history = useHistory();
    const classes = useStyles();
    const { ...rest } = props;
    return (
        <div>
            <Header
                isMain={false}
                rightLinks={<HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}>
            </Header>
            <div id="home">
                <Parallax image={require("../../assets/img/bg2.jpg")}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem>
                                <div style={{ marginTop: "220px" }} className={classes.brand}>
                                    <h1 className={styleModule.title2}>URUNLERIMIZ</h1>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
            </div>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div id="shop">
                    <SectionCarousel />
                </div>
            </div>
            <Footer />
        </div>
    );
}
