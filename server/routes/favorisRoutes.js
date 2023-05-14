const express = require("express");
const {
  getFavoris,
  createFavoris,
  deleteFavoris,
} = require("../services/favorisService");
const {
  DeleteFavorisValidator,
  createFavorisValidator,
  getFavorisValidator,
} = require("../utils/validators/favoriValidator");
const verifyToken = require("../middlewares/verifieToken");

const router = express.Router();

router.route("/").get(verifyToken, getFavoris);
router.route("/").post(verifyToken, createFavorisValidator, createFavoris);
router.route("/:id").delete(verifyToken, DeleteFavorisValidator, deleteFavoris);

module.exports = router;
