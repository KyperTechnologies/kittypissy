/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShopIcon from '@material-ui/icons/Shop';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import ProductPage from "../views/Components/Sections/SectionProducts";
import AddProductPage from "../views/Components/Sections/SectionAddProduct";
import UserProfile from "../views/UserProfile/UserProfile";
import Order from "../views/TableList/Order";

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/urunler",
    name: "Urunler",
    icon: Dashboard,
    component: ProductPage,
    layout: "/dashboard"
  },
  {
    path: "/ekle",
    name: "Urun Ekle",
    icon: AddBoxIcon,
    component: AddProductPage,
    layout: "/dashboard"
  },
  {
    path: "/profil",
    name: "Kullanici Profili",
    icon: Person,
    component: UserProfile,
    layout: "/dashboard"
  },
  {
    path: "/siparis",
    name: "Siparisler",
    icon: ShopIcon,
    component: Order,
    layout: "/dashboard"
  },
  {
    path: "/cikis",
    name: "CIKIS",
    icon: ExitToAppIcon,
    layout: "/dashboard"
  },
];

export default dashboardRoutes;
