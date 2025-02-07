const { Schema, model } = require("mongoose");

const EmpresaSchema = Schema(
  {
    ubicacion: {
      type: String,
      required: [true, "Ubicación física de la empresa es necesaria"],
    },

    nombre: {
      type: String,
      required: [true, "NIT es necesario"],
    },

    nit: {
      type: String,
      required: [true, "NIT es necesario"],
    },

    img: {
      type: String,
    },
    estado: {
      type: String,
      default: true,
    },
    eliminado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

EmpresaSchema.methods.toJSON = function () {
  const { __v, _id, ...empresa } = this.toObject();
  empresa.id = _id;
  return empresa;
};

module.exports = model("Empresa", EmpresaSchema);
