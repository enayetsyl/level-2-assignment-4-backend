"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
// Todo. Create your own zod validation here. Below i show a simple validation that only receive one item from the frontend. 
const productValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Name must be string',
        })
            .min(5, { message: "Must be 5 or more characters long" })
            .trim(),
        description: zod_1.z
            .string({
            invalid_type_error: 'Description must be string',
        })
            .min(50, { message: "Must be 50 or more characters long" })
            .trim(),
        brand: zod_1.z
            .string({
            invalid_type_error: 'Brand must be string',
        })
            .trim(),
        image: zod_1.z
            .string({
            invalid_type_error: 'Image url must be string',
        })
            .trim(),
        rating: zod_1.z
            .string({
            invalid_type_error: 'Rating  must be string',
        })
            .trim(),
        quantity: zod_1.z
            .number()
            .int({ message: "Quantity should be whole number." })
            .positive({ message: "Quantity can not be negative." }),
        price: zod_1.z
            .number()
            .positive({ message: "Price can not be negative." }),
    })
});
const productUpdateValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'Name must be string',
    })
        .min(5, { message: "Must be 5 or more characters long" })
        .trim()
        .optional(),
    description: zod_1.z
        .string({
        invalid_type_error: 'Description must be string',
    })
        .min(50, { message: "Must be 50 or more characters long" })
        .trim().optional(),
    brand: zod_1.z
        .string({
        invalid_type_error: 'Brand must be string',
    })
        .trim().optional(),
    image: zod_1.z
        .string({
        invalid_type_error: 'Image url must be string',
    })
        .trim().optional(),
    rating: zod_1.z
        .string({
        invalid_type_error: 'Rating  must be string',
    })
        .trim().optional(),
    quantity: zod_1.z
        .number()
        .int({ message: "Quantity should be whole number." })
        .positive({ message: "Quantity can not be negative." }).optional(),
    price: zod_1.z
        .number()
        .positive({ message: "Price can not be negative." }).optional(),
});
const orderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        _id: zod_1.z
            .string({
            invalid_type_error: '_id must be string',
        }),
        quantity: zod_1.z
            .number()
            .int({ message: "Quantity should be whole number." })
            .positive({ message: "Quantity can not be negative." }).optional(),
    })
});
exports.ProductValidation = {
    productValidationSchema, productUpdateValidationSchema, orderValidationSchema
};
