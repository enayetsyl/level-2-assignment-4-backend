"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_service_1 = require("./product.service");
// Below you can see the application of catchAsync function. 
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, brand, quantity, price, rating, image, description, } = req.body;
    const result = yield product_service_1.ProductServices.createProductIntoDB(name, brand, quantity, price, rating, image, description);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product created successfully',
        data: result,
    });
}));
const orderProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductServices.createOrderIntoDB(req.body);
    console.log('result', result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order Placed successfully',
        data: result,
    });
}));
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
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sort, minPrice, maxPrice } = req.query;
    const filters = {};
    // Search by name, brand, or description
    if (search) {
        const searchRegex = new RegExp(search, 'i');
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
    }
    else if (sort === 'highToLow') {
        sortOptions = { price: -1 };
    }
    // Fetch the products with filters and sorting
    const result = yield product_service_1.ProductServices.getFilteredAndSortedProducts(filters, sortOptions);
    // Send the response with 'data' wrapping the result
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Products fetched successfully',
        data: result,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('id', id);
    const result = yield product_service_1.ProductServices.deleteProductFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product deleted successfully',
        data: '',
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield product_service_1.ProductServices.updateProductIntoDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product updated successfully',
        data: result,
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductServices.getProductFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product fetched successfully',
        data: result,
    });
}));
exports.ProductControllers = {
    createProduct, getAllProducts, deleteProduct, updateProduct, getSingleProduct, orderProducts
};
