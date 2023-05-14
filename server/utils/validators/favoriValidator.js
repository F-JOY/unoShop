const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createFavorisValidator = [
  
  check("product")
    .notEmpty()
    .withMessage("Le produit doit être renseigné.")
    .isMongoId()
    .withMessage("Le Produit doit être une référence MongoDB valide."),
  validatorMiddleware,
];

exports.DeleteFavorisValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];


