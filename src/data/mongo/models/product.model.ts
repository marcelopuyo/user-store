import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nombre es requerido'],
    unique: true
  },
  available: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
});

export const ProductModel = mongoose.model('Product', productSchema);

