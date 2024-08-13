import { Request, Response } from 'express';
import { mockProducts } from '../../data/Products/mockProducts';

// @desc get all products
// @route GET /products
// @access Public
export const getProducts =  (req: Request, res: Response) => {
    console.log(req.headers.cookie)
    console.log(req.cookies)
    res.status(200).json(mockProducts);
}

// @desc get a single product
// @route GET /products/:id
// @access Public
export const getProduct =  (req: Request, res: Response) => {
    if (req.product) {
        res.status(200).json(req.product);
    } else {
        res.status(404).json({
            message: 'No product found with that id', 
        })
    }
}

// @desc get a product by the query parameter
// @route GET /products/query
// @access Public
export const getProductsByQuery =  (req: Request, res: Response) => {
    if (req.product) {
        res.send(req.product).status(200);
    }else{
        return res
        .json(mockProducts)
        .status(200)
    }
}

//@desc create a new product
//@route POST /products
//@access Public
export const createProduct =  (req: Request, res: Response) => {
    if (req.product) {
        res.json(req.product).status(200);
    }
}

//@desc update a product
//@route PUT /products/:id
//@access Public
export const updateProduct =  (req: Request, res: Response) => {
    if (req.product) {
        res.json(req.product).status(200);
    }
}

//@desc update certain fields of a product
//@route PATCH /products/update/:id
//@access Public
export const targetedUpdateProduct =  (req: Request, res: Response) => {
    if (req.product) {
        res.json(req.product).status(200);
    }
}

//@desc delete a product
//@route DELETE /products/:id
//@access Public
export const deleteProduct =  (req: Request, res: Response) => {
    if (req.product) {
        return res
        .json(req.product)
        .status(200);
    }
}