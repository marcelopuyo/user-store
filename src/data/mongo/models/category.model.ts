import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nombre es requerido'],
    unique: true
  },
  available: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

export const CategoryModel = mongoose.model('Category', categorySchema);

