const {
  createOrderValidator,
  changeEtatOrderValidator,
} = require("../utils/validators/orderValidator");
const {
  createOrder,
  getOrders,
  changeOrderStatus,
  getTotalPriceOrders,
  getOrdersByUser,
  getOrdersproductFournisseur,
} = require("../services/orderServices");
const isAdmin = require("../middlewares/isAdmin");
const express = require("express");
const verifyToken = require("../middlewares/verifieToken");
const router = express.Router();
router.route("/totalprice/").get(getTotalPriceOrders);
router.route("/orderbyusers/").get(verifyToken, getOrdersByUser);
router
  .route("/")
  .post(verifyToken, createOrderValidator, createOrder)
  .get(getOrders);
router.route("/:orderid").put(verifyToken,isAdmin,changeEtatOrderValidator, changeOrderStatus);
router.route("/orderfournisseur").get(verifyToken, getOrdersproductFournisseur);
module.exports = router;
