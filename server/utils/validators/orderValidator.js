const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createOrderValidator = [
  check("adresse")
    .notEmpty()
    .withMessage("veuillez nous comuniquer Votre adresse"),
  check("telephone")
    .notEmpty()
    .withMessage("veuillez nous donner votre numero de telephone"),
  validatorMiddleware,
];

exports.changeEtatOrderValidator = [
  check("status").notEmpty().withMessage("veuillez saisir le chammps status"),
  validatorMiddleware,
];
exports.orderByFournisseurs = [
  check("idfourni")
    .notEmpty()
    .withMessage("Le ID fournisseur  doit être renseigné.")
    .isMongoId()
    .withMessage("Le ID fournisseur  doit être une référence MongoDB valide."),
];