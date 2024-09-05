"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../module/Product/product.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/products',
        route: product_route_1.ProductRoutes,
    }, // This is a sample replace it with your actual path and route.
    // Todo add necessary path and route in this array
];
moduleRoutes.forEach((route) => router.use(route.path, route.route)); // This will automatically loop your routes that you will add in the moduleRoutes array
exports.default = router;
