/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';


const productSchema = new Schema<TProduct>(
  {

    name: {
    type: String,
    required: true,
   },
   brand: {
    type: String,
    required: true,
   },
   quantity: {
    type: Number,
    required: true,
   },
   price: {
    type: Number,
    required: true,
   },
   rating: {
    type: String,
    required: true,
   },
   image: {
    type: String,
    required: true,
   },
   description: {
    type: String,
    required: true,
   },
  },
  {
    timestamps: true,
  },
);





export const Product = model<TProduct>('Product', productSchema);