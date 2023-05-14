const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");
const favorisModel = require("../models/favorisModel");

/*-----------------------------
**@desc GET Favoris Token Obligatoire
**@Route GET /api/v1/favoris
**@Acces Public Client
-----------------------------*/
exports.getFavoris = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const favoris = await favorisModel.find({ user: id }).populate("product");
  res.status(200).json(favoris);
});

/*-----------------------------
**@desc Create Favoris Token Obligatoire
**@Route Post /api/v1/favoris
**@Acces Public Client
-----------------------------*/
exports.createFavoris = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const product = req.body.product;

  try {
    // Vérifier si le produit est déjà dans la liste des favoris de l'utilisateur
    const favoriExist = await favorisModel.findOne({ user, product });

    if (favoriExist) {
      return next(
        new ApiError(
          `Le produit existe déjà dans la liste des favoris de l'utilisateur.`,
          400
        )
      );
    }

    // Ajouter le favori
    const favori = await favorisModel.create({ user, product });
    res.status(201).json(favori);
  } catch (error) {
    console.error("Erreur lors de l'ajout du favori :", error);
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'ajout du favori." });
  }
});

/*-----------------------------
**@desc Delete Favoris Token pas obligatoire
**@Route Post /api/v1/favoris/:id de la favoris
**@Acces Public Client
-----------------------------*/
exports.deleteFavoris = factory.deleteOne(favorisModel);
