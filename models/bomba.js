const { Schema, model } = require("mongoose");

const BombaSchema = Schema(
  {
    id_refineria: {
      type: Schema.Types.ObjectId,
      ref: "Refineria",
      required: true,
    },

    ubicacion: {
      type: String,
      required: [true, "Ubicación física de la bomba es necesaria"],
    },
    apertura: {
      type: Number,
      required: [true, "% de apertura necesario"],
    },
    rpm: {
      type: Number,
      required: [true, "RPM es obligatorio"],
    },
    caudal: {
      type: Number,
      required: [true, "Caudal de bomba es obligatorio"],
    },
    eliminado: {
      type: Boolean,
      default: false,
    },
    estado: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BombaSchema.methods.toJSON = function () {
  const { __v, _id, ...bomba } = this.toObject();
  bomba.id = _id;
  return bomba;
};

module.exports = model("Bomba", BombaSchema);
