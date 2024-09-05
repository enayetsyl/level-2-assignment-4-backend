import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';
import { Request, Response } from 'express';
import { ParsedQs } from 'qs';

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

// const getAllProducts = catchAsync(async (req: Request, res: Response) => {
//   const { search, sort, minPrice, maxPrice } = req.query;

//   const filters: any = {};

//   // Search by name, brand, or description
//   if (search) {
//     const searchRegex = new RegExp(search as string, 'i');
//     filters.$or = [
//       { name: searchRegex },
//       { brand: searchRegex },
//       { description: searchRegex },
//     ];
//   }

//   // Filter by price range
//   if (minPrice && maxPrice) {
//     filters.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
//   }

//   // Sorting by price
//   let sortOptions = {};
//   if (sort === 'lowToHigh') {
//     sortOptions = { price: 1 };
//   } else if (sort === 'highToLow') {
//     sortOptions = { price: -1 };
//   }

//   const result = await ProductServices.getFilteredAndSortedProducts(filters, sortOptions);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Products fetched successfully',
//     data: result,
//   });
// });

const getAllProducts = catchAsync(async (req: Request<{}, any, any, ParsedQs>, res: Response) => {
  const { search, sort, minPrice, maxPrice } = req.query as {
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  };

  const filters: any = {};

  // Search by name, brand, or description
  if (search) {
    const searchRegex = new RegExp(search as string, 'i');
    filters.$or = [
      { name: searchRegex },
      { brand: searchRegex },
      { description: searchRegex },
    ];
  }

  // Filter by price range
  if (minPrice && maxPrice) {
    filters.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  }

  // Sorting by price
  let sortOptions = {};
  if (sort === 'lowToHigh') {
    sortOptions = { price: 1 };
  } else if (sort === 'highToLow') {
    sortOptions = { price: -1 };
  }

  // Fetch the products with filters and sorting
  const result = await ProductServices.getFilteredAndSortedProducts(filters, sortOptions);
  // Send the response with 'data' wrapping the result
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