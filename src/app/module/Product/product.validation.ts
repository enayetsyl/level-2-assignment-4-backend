import { z } from 'zod';

// Todo. Create your own zod validation here. Below i show a simple validation that only receive one item from the frontend. 

const productValidationSchema = z.object({
  body: z.object({
    name: z
    .string({
      invalid_type_error: 'Name must be string',
    })
    .min(5, {message: "Must be 5 or more characters long"})
    .trim(),
  description: z
    .string({
      invalid_type_error: 'Description must be string',
    })
    .min(50, {message: "Must be 50 or more characters long"})
    .trim(),
  brand: z
    .string({
      invalid_type_error: 'Brand must be string',
    })
    .trim(),
  image: z
    .string({
      invalid_type_error: 'Image url must be string',
    })
    .trim(),
  rating: z
    .string({
      invalid_type_error: 'Rating  must be string',
    })
    .trim(),
  quantity: z
    .number()
    .int({message: "Quantity should be whole number."})
    .positive({message: "Quantity can not be negative."}),
  price: z
    .number()
    .positive({message: "Price can not be negative."}),
  })
   
});
const productUpdateValidationSchema = z.object({
  body: z.object({
    name: z
    .string({
      invalid_type_error: 'Name must be string',
    })
    .min(5, {message: "Must be 5 or more characters long"})
    .trim()
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Description must be string',
    })
    .min(50, {message: "Must be 50 or more characters long"})
    .trim().optional(),
  brand: z
    .string({
      invalid_type_error: 'Brand must be string',
    })
    .trim().optional(),
  image: z
    .string({
      invalid_type_error: 'Image url must be string',
    })
    .trim().optional(),
  rating: z
    .string({
      invalid_type_error: 'Rating  must be string',
    })
    .trim().optional(),
  quantity: z
    .number()
    .int({message: "Quantity should be whole number."})
    .positive({message: "Quantity can not be negative."}).optional(),
  price: z
    .number()
    .positive({message: "Price can not be negative."}).optional(),
  })
   
});

// You can read my following blog to get deeper understanding about creating different types of zod validation https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck

export const ProductValidation = {
  productValidationSchema,productUpdateValidationSchema
};