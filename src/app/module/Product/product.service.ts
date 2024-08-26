/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from './product.interface';
import { Product } from './product.model';

// Todo. Create your own service function to write the business logic. 

//You can read my following blog to get deeper understanding about creating different types of service function https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck


const createProductIntoDB = async (name: string, brand: string, quantity: number, price: number, rating: string, image:string, description: string) => {
  const newProduct = new Product({
    name,
    brand,
    quantity,
    price,
    rating,
    image,
    description,
  });

  const savedProduct = await newProduct.save();

};

const getProductsFromDB = async () => {
  
  const fetchedProduct = await Product.find();

  return fetchedProduct
 
};
const deleteProductFromDB = async (id: string) => {
  
  const deletedProduct = await Product.findByIdAndDelete(id);

  return deletedProduct
 
};
const updateProductIntoDB = async (id : string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {new: true})

  if (!result) {
    throw new Error('Product not found');
  }

  return result;
 
};

export const ProductServices = {
  createProductIntoDB, getProductsFromDB, deleteProductFromDB, updateProductIntoDB
};