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
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import ProductPage from "../views/Components/Sections/SectionProducts";
import UserProfile from "../views/UserProfile/UserProfile";
import TableList from "../views/TableList/TableList";
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
    path: "/profil",
    name: "Kullanici Profili",
    icon: Person,
    component: UserProfile,
    layout: "/dashboard"
  },
  {
    path: "/siparis",
    name: "Siparisler",
    icon: ShoppingCart,
    component: TableList,
    layout: "/dashboard"
  },
];

export default dashboardRoutes;
