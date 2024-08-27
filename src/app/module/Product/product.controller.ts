import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

// Below you can see the application of catchAsync function. 
const createProduct = catchAsync(async (req, res) => {
  const { name, brand, quantity, price, rating, image, description, } = req.body;  
  
  const result = await ProductServices.createProductIntoDB(
    name, brand, quantity, price, rating, image, description
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});
const orderProducts = catchAsync(async (req, res) => {
  // const { items } = req.body;  
  // console.log('items', items)
  // console.log('req.body', req.body)
  const result = await ProductServices.createOrderIntoDB(
    req.body
  );
  console.log('result',result)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Placed successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  
  const result = await ProductServices.getProductsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  
  const {id} = req.params
  console.log('id', id)
  const result = await ProductServices.deleteProductFromDB(id);
 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: '',
  });
});

const updateProduct = catchAsync(async (req, res) => {
  
  const {id} = req.params
  const payload = req.body;
  const result = await ProductServices.updateProductIntoDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});
const getSingleProduct = catchAsync(async (req, res) => {
  
  const {id} = req.params

  const result = await ProductServices.getProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});



export const ProductControllers = {
  createProduct, getAllProducts, deleteProduct, updateProduct, getSingleProduct, orderProducts
 };