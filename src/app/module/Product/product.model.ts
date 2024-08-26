/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';
import config from '../../../config';

// Todo. Change the code as par your project need. Below mongoose schema, pre and post hook and static method code is shown for your reference. 

//You can read my following blog to get deeper understanding about creating different types of schema and model https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck

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