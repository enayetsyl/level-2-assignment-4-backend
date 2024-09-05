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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (name, brand, quantity, price, rating, image, description) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new product_model_1.Product({
        name,
        brand,
        quantity,
        price,
        rating,
        image,
        description,
    });
    const savedProduct = yield newProduct.save();
});
const createOrderIntoDB = (items) => __awaiter(void 0, void 0, void 0, function* () {
    const updateResults = [];
    // First, check if all items have sufficient stock
    for (const item of items) {
        const product = yield product_model_1.Product.findById(item.productId);
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
        const result = yield product_model_1.Product.findByIdAndUpdate(item.productId, {
            $inc: { quantity: -item.quantity },
        }, { new: true });
        updateResults.push(result);
    }
    return { success: true, updateResults };
});
const getProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedProduct = yield product_model_1.Product.find();
    return fetchedProduct;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.Product.findByIdAndDelete(id);
    return deletedProduct;
});
const updateProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, { new: true });
    if (!result) {
        throw new Error('Product not found');
    }
    return result;
});
const getProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    if (!result) {
        throw new Error('Product not found');
    }
    return result;
});
const getFilteredAndSortedProducts = (filters, sortOptions) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find(filters).sort(sortOptions);
});
exports.ProductServices = {
    createProductIntoDB, getProductsFromDB, deleteProductFromDB, updateProductIntoDB, getProductFromDB, createOrderIntoDB, getFilteredAndSortedProducts
};
