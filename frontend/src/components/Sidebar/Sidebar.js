/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { NavLink as Link } from "react-bootstrap"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "../Navbars/RTLNavbarLinks.js";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import styles from "../../assets/jss/material-dashboard-react/components/sidebarStyle.js";
import styleModule from "./style.module.css";
import { Row, Col } from "react-bootstrap";

const useStyles = makeStyles(styles);

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function Sidebar(props) {
  const classes = useStyles();
  const { color, logo, image, logoText, routes, cart } = props;

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const getName = (prop, whiteFontClasses) => {
    let icon = null;
    let cartData = localStorage.getItem("cart") === null ? [] : JSON.parse(localStorage.getItem("cart"));
    props.handleCartData;
    let cartSize = cartData.length;
    if (prop.name == "Sepetim") {
      icon = (
        <Row style={{ alignItems: "center" }}>
          <Col md={2}>
            <StyledBadge badgeContent={cartSize} color="secondary">
              <ShoppingCart />
            </StyledBadge>
          </Col>
          <Col md={10}>
            <p style={{ marginLeft: "-1px", marginBottom: "0", padding: "4px" }}>Sepetim</p>
          </Col>
        </Row>
      );
    } else {
      icon = (<prop.icon
        className={classNames(classes.itemIcon, whiteFontClasses, {
          [classes.itemIconRTL]: props.rtlActive
        })}
      />);
    }
    return icon;
  }

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/cikis") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        const data = prop.name === "CIKIS" ? (
          <Link
            href="/"
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink2 + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                  getName(prop, whiteFontClasses)
                )}
              {prop.name != "Sepetim" ?
                <ListItemText
                  primary={props.rtlActive ? prop.rtlName : prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive
                  })}
                  disableTypography={true}
                /> : (null)}
            </ListItem>
          </Link>
        ) : (
            <NavLink
              to={prop.layout + prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                    getName(prop, whiteFontClasses)
                  )}
                {prop.name != "Sepetim" ?
                  <ListItemText
                    primary={props.rtlActive ? prop.rtlName : prop.name}
                    className={classNames(classes.itemText, whiteFontClasses, {
                      [classes.itemTextRTL]: props.rtlActive
                    })}
                    disableTypography={true}
                  /> : (null)}
              </ListItem>
            </NavLink>
          );
        return data;
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo} style={{ textAlign: "center" }}>
      <p className={styleModule.title}>{logoText}</p>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  handleCartData: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
