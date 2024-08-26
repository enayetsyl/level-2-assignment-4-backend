/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TProduct {
  name: string;
  brand: string;
  quantity: number;
  price: number;
  rating: string;
  image: string;
  description:string;
}

