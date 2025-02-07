const { response, request } = require("express");

const Empresa = require("../models/empresa");

const empresasGets = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { eliminado: false };

  const [total, empresas] = await Promise.all([
    Empresa.countDocuments(query),
    Empresa.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    empresas,
  });
};

const empresasGet = async (req = request, res = response) => {
  const { id } = req.params;
  const empresa = await Empresa.findById(id);

  // Verificar si el campo eliminado es falso
  if (empresa && !empresa.eliminado) {
    res.json(empresa);
  } else {
    // Enviar una respuesta apropiada si el empresa no existe o está marcado como eliminado
    res.status(404).json({
      msg: "Empresa no encontrado o eliminado",
    });
  }
};

const empresasPost = async (req, res = response) => {
  const { ubicacion, nombre, nit, img } = req.body;
  const empresa = new Empresa({
    ubicacion,
    nombre,
    nit,
    img,
  });
  try {
    // Guardar en BD
    await empresa.save();

    res.json({
      empresa,
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const empresasPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  const empresa = await Empresa.findByIdAndUpdate(id, resto, { new: true });

  res.json(empresa);
};

const empresasDelete = async (req, res = response) => {
  const { id } = req.params;
  const empresa = await Empresa.findByIdAndUpdate(
    id,
    { eliminado: true },
    { new: true }
  );

  res.json(empresa);
};

const empresasPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

module.exports = {
  empresasPost,
  empresasGet,
  empresasGets,
  empresasPut,
  empresasDelete,
  empresasPatch,
};
