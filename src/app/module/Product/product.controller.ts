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

  // Below you can see the use of custom sendResponse function to make the code base clean. 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  
  const result = await ProductServices.getProductsFromDB();

  console.log('results', result)

  // Below you can see the use of custom sendResponse function to make the code base clean. 
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

  console.log('results', result)

  // Below you can see the use of custom sendResponse function to make the code base clean. 
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

  console.log('results', result)

  // Below you can see the use of custom sendResponse function to make the code base clean. 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});



export const ProductControllers = {
  createProduct, getAllProducts, deleteProduct, updateProduct
 };