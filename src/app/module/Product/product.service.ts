/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderItem } from '../../interface/order';
import { TProduct } from './product.interface';
import { Product } from './product.model';

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

const createOrderIntoDB = async (items: OrderItem[]) => {
  const updateResults = [];

  // First, check if all items have sufficient stock
  for (const item of items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      console.error(`Product with id ${item.productId} not found`);
      return { success: false, message: `Product with id ${item.productId} not found` };
    }

    if (product.quantity < item.quantity) {
      console.error(`Not enough stock for product ${product.name}`);
      return { success: false, message: `Not enough stock for product ${product.name}` };
    }
  }

  // If all items have sufficient stock, proceed to update
  for (const item of items) {
    const result = await Product.findByIdAndUpdate(item.productId, {
      $inc: { quantity: -item.quantity },
    }, { new: true });

    updateResults.push(result);
  }

  return { success: true, updateResults };
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

const getProductFromDB = async (id : string) => {
  const result = await Product.findById(id)

  if (!result) {
    throw new Error('Product not found');
  }

  return result;
 
};

const getFilteredAndSortedProducts = async (filters: any, sortOptions: any) => {
  return await Product.find(filters).sort(sortOptions);
};

export const ProductServices = {
  createProductIntoDB, getProductsFromDB, deleteProductFromDB, updateProductIntoDB, getProductFromDB, createOrderIntoDB,  getFilteredAndSortedProducts
};