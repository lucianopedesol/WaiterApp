import { model, Schema } from 'mongoose';

export const Product = model('Product', new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  ingredients: {
    type: [{
      icon: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true
      }
    }],
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  }
}));
