import React from "react";
import styleModule from "./style.module.css"
import { Link } from "react-scroll";
import {NavLink}  from "react-bootstrap"
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import styles from "../../assets/jss/material-kit-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color,isMain, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  });
  const mainLink = <Button><NavLink href="/"><span className={styleModule.title}>KITTY PISSY</span></NavLink></Button>;
  const brandComponent = <Button><Link activeClass="active"
    to="home"
    spy={true}
    smooth={true}
    offset={-50}
    duration={500}
    className={styleModule.title}
  ><span>KITTY PISSY</span></Link></Button>;
  const Link1 = <Button><Link activeClass="active"
  to="shop"
  spy={true}
  smooth={true}
  offset={-100}
  duration={500}
  className={styleModule.title}
  ><span>URUNLERIMIZ</span></Link></Button>;
  const Link2 = <Button className={styleModule.button}><Link activeClass="active"
  to="features"
  spy={true}
  smooth={true}
  offset={-50}
  duration={500}
  className={styleModule.title}
  ><span>ICERIK</span></Link></Button>;
  const Link3 = <Button><Link activeClass="active"
  to="contact"
  spy={true}
  smooth={true}
  offset={0}
  duration={500}
  className={styleModule.title}
  ><span>ILETISIM</span></Link></Button>;
  const Link4 = <Button
  ><NavLink
  href="/uyeol"
  className={styleModule.title2}
  ><span>UYE OL</span></NavLink></Button>;
  const Link5 = <Button
  ><NavLink
  href="/giris"
  className={styleModule.title2}
  ><span>GIRIS YAP</span></NavLink></Button>;
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <div>
          {!isMain ? (mainLink
          ) : (
              brandComponent
            )}
        </div>
        {isMain ? 
        (<Hidden smDown implementation="css">
          {Link1} {Link2} {Link3} {Link4} {Link5}
        </Hidden>): (<Hidden smDown implementation="css">
           {Link4} {Link5}
        </Hidden>)}
      </Toolbar>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};
