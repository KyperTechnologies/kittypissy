import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import UserService from "../service/UserService";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
import routes from "./routes.js";
import adminRoutes from "./adminRoutes.js";
import { useHistory } from "react-router";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle";
import bgImage from "../assets/img/bg4.png";
import Button from "@material-ui/core/Button";
import styleModule from "./style.module.css";
import Navbar from "../components/Navbars/Navbar.js";

let ps;
const useStyles = makeStyles(styles);

export default function Admin(props) {
  // styles
  const classes = useStyles();
  const history = useHistory();

  const { ...rest } = props;
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [cart, setCart] = React.useState();
  const [role, setRole] = React.useState("User");

  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleCartData = cart => {
    console.log("girdi");
    setCart(cart);
  }

  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/dashboard/map";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/dashboard") {
          if (prop.name === "Urunler" || prop.name === "Sepetim") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={() => <prop.component handleCartData={handleCartData} ></prop.component>}
                key={key}
              />);
          } else {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />);
          }
        }
        return null;
      })}
      <Redirect from="/dashboard" to="/dashboard/urunler" />
    </Switch>
  );

  const switchAdminRoutes = (
    <Switch>
      {adminRoutes.map((prop, key) => {
        if (prop.layout === "/dashboard") {
          if (prop.name === "Urunler") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={() => <prop.component handleCartData={handleCartData} ></prop.component>}
                key={key}
              />);
          } else {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />);
          }
        }
        return null;
      })}
      <Redirect from="/dashboard" to="/dashboard/urunler" />
    </Switch>
  );

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    const getRole = async () => {
      const email = localStorage.getItem("email");
      const role = await UserService.getUserRole(email);
      setRole(role);
    }
    getRole();
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel, role, cart]);

  return (
    <div className={classes.wrapper} style={{ backgroundColor: "#f1f1f1" }}>
      <Sidebar
        routes={role === "User" ? routes : adminRoutes}
        logoText={"KITTY PISSY"}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        handleCartData={handleCartData}
        open={mobileOpen}
        color={color}
        cart={cart}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{role === "User" ? switchRoutes : switchAdminRoutes}</div>
          </div>)
          : (null)}
        {getRoute() ? <Footer /> : null}
        <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
      </div>
    </div>
  );
}
