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
  emailExiste,
  existeUsuarioPorId,
  nitExiste,
  existeEmpresaPorId,
} = require("../helpers/db-validators");

const {
  empresasGet,
  empresasPut,
  empresasPost,
  empresasDelete,
  empresasPatch,
  empresasGets,
} = require("../controllers/empresas");

const router = Router();

router.get("/", empresasGets);
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    // check('id').custom( existeProductoPorId ),
    validarCampos,
  ],
  empresasGet
);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeEmpresaPorId),
    //check("rol").custom(esRoleValido), subiendo cambioos
    validarCampos,
  ],
  empresasPut
);

router.post(
  "/",
  [
    check("ubicacion", "La ubicación es obligatorio").not().isEmpty(),
    check("nombre", "El nombre del tanque es obligatorio").not().isEmpty(),
    check("nit", "El NIT es obligatorio").not().isEmpty(),
    check("img", "El logotipo de la empresa es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  empresasPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole,
    tieneRole("superAdmin", "admin"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeEmpresaPorId),
    validarCampos,
  ],
  empresasDelete
);

router.patch("/", empresasPatch);

module.exports = router;
