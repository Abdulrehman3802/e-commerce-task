const express = require("express");
const router = express.Router();
const saleRoute = require("./sale.route");
const inventoryRoute = require("./inventory.route");
const defaultRoutes = [
  {
    path: "/sales",
    route: saleRoute,
  },
  {
    path: "/inventory",
    route: inventoryRoute,
  }

];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;