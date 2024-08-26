/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { ProductControllers } from './product.controller';
import { ProductValidation } from './product.validation';

// Todo. Everything in this file need to customize according to your requirement

const router = express.Router();

router.post(
  '/create-product',
  validateRequest(ProductValidation.productValidationSchema), 
  ProductControllers.createProduct,
);
router.put(
  '/update-product/:id',
  validateRequest(ProductValidation.productUpdateValidationSchema), 
  ProductControllers.updateProduct,
);

router.get(
  '/get-all-products',
  ProductControllers.getAllProducts
)

router.delete(
  '/delete/:id',
    ProductControllers.deleteProduct
)

//Todo. Create get, post, put, patch, delete etc route as par your requirement. You can read my following blog to get deeper understanding about creating different types of route https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck



export const ProductRoutes = router;