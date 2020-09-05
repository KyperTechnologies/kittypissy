import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import profile from "../../../assets/img/kedi.png";

import styles from "../../../assets/jss/material-kit-react/views/componentsSections/exampleStyle.js";
import styleModule from "./style.module.css"

const useStyles = makeStyles(styles);

export default function SectionExamples() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={styleModule.container}>
        <img
          src={profile}
          alt="..."
          style={{ width: "100%" }}
          className={
            classes.imgRaised +
            " " +
            classes.imgRounded +
            " " +
            classes.imgFluid
          }
        />
        <div className={styleModule.borderTopLeft} />
        <div className={styleModule.textTopLeft}>
          <h1 className={styleModule.title5}>EN SAGLIKLI VE KALITELI URUNLER</h1>
          <div className={styleModule.line2}></div>
          <h1 className={styleModule.title5}>TAMAMIYLE<br/> YERLI IMALAT</h1>
          <div className={styleModule.line2}></div>
          <h1 className={styleModule.title5}>GUVENILIR SATIS</h1>
        </div>
      </div>
    </div>
  );
}
