const { Schema, model } = require("mongoose");

const RecepcionSchema = Schema(
  {
    contrato: {
      type: Schema.Types.ObjectId,
      ref: "Contrato",
      required: false,
    },

    cantidadRecibida: {
      type: Number,
      required: [false, "Cantidad recibida obligatoria"],
    },

    precioUnitario: {
      type: Number,
      required: [false, "Precio Unitario obligatorio"],
    },

    montoTotal: {
      type: Number,
      required: [false, "Monto Total obligatorio"],
    },

    estado: {
      type: String,
      enum: ["En tránsito", "Entregado"],
      default: "En tránsito",
    },

    fechaRecepcion: {
      type: Date,
      required: [false, "Fecha de recepción obligatoria"],
    },
    hora: {
      type: Date,
      required: [false, "Hora de recepción obligatoria"],
    },
    id_lote: {
      type: Schema.Types.ObjectId,
      ref: "Lotes_producto",
      required: false,
    },

    id_linea: {
      type: Schema.Types.ObjectId,
      ref: "Linea_carga",
      required: false,
    },
    id_tanque: {
      type: Schema.Types.ObjectId,
      ref: "Tanque",
      required: false,
    },
    id_contrato: {
      type: Schema.Types.ObjectId,
      ref: "Contrato",
      required: false,
    },
    id_guia: {
      type: Number,
      required: [false, "Número de guía obligatorio"],
    },
    placa: {
      type: String,
      required: [false, "Placa del Vehículo obligatorio"],
    },
    nombre_chofer: {
      type: String,
      required: [false, "Nombre del Chofer obligatorio"],
    },
    apellido_chofer: {
      type: String,
      required: [false, "Apellido del chofer obligatorio"],
    },
    eliminado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

RecepcionSchema.methods.toJSON = function () {
  const { _id, ...recepcion } = this.toObject();
  recepcion.id = _id;
  return recepcion;
};

module.exports = model("Recepcion", RecepcionSchema);
