"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
// Todo. Everything in this file need to customize according to your requirement
const router = express_1.default.Router();
router.post('/create-product', (0, validateRequest_1.default)(product_validation_1.ProductValidation.productValidationSchema), product_controller_1.ProductControllers.createProduct);
router.put('/update-product/:id', (0, validateRequest_1.default)(product_validation_1.ProductValidation.productUpdateValidationSchema), product_controller_1.ProductControllers.updateProduct);
router.get('/get-all-products', product_controller_1.ProductControllers.getAllProducts);
router.get('/get-single-product/:id', product_controller_1.ProductControllers.getSingleProduct);
router.delete('/delete/:id', product_controller_1.ProductControllers.deleteProduct);
router.post('/order', 
// validateRequest(ProductValidation.orderValidationSchema),
product_controller_1.ProductControllers.orderProducts);
exports.ProductRoutes = router;
