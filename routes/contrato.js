const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  //esRoleValido,
  // emailExiste,
  // existeUsuarioPorId,
  // nitExiste,
  existeContratoPorId,
} = require("../helpers/db-validators");

const {
  contratoGet,
  contratoPut,
  contratoPost,
  contratoDelete,
  contratoPatch,
  contratoGets,
} = require("../controllers/contrato");

const router = Router();

router.get("/", contratoGets);
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    // check('id').custom( existeProductoPorId ),
    validarCampos,
  ],
  contratoGet
);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeContratoPorId),
    //check("rol").custom(esRoleValido),
    validarCampos,
  ],
  contratoPut
);

router.post(
  "/",
  [
    //Validación de campos.
    //check("ubicacion", "La ubicación es obligatorio").not().isEmpty(),
    //check("nombre", "El nombre del contrato es obligatorio").not().isEmpty(),
    //check("capacidad", "La capacidad del contrato es obligatoria")
    //  .not()
    //.isEmpty(),
    // check("material", "El material del contrato es obligatoria").not().isEmpty(),
    // validarCampos,
  ],
  contratoPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole,
    tieneRole("superAdmin", "admin"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeContratoPorId),
    validarCampos,
  ],
  contratoDelete
);

router.patch("/", contratoPatch);

module.exports = router;
