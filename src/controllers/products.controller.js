import { findAll, findById, createOne, deleteOne, updateOne } from '../services/products.service.js'
import { generateAllProducts } from '../faker.js';
import CustomError from '../errors/error.js';
import { ErrorMessages } from '../errors/error.enum.js';


export const findProducts = async (req, res) => {
    try {
        const products = await findAll(req.query);
        res.status(200).json({ message: 'Products founded', products })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const findProductById = async (req, res, next) => {
    const { pid } = req.params
    try {
        const product = await findById(pid)
        if (!product) {
            await CustomError.createError(ErrorMessages.PRODUCT_NOT_FOUND, ErrorMessages.ISSUE_PRODUCT);
        }
        res.status(200).json({ message: 'Product found', product })
    } catch (error) {
        next(error)
    }
};

export const newProduct = async (req, res, next) => {
    const { title, description, price, status, stock, category, sale, sale_percent } = req.body
    
    try {
        if (!title || !description || !price || !stock || !category) {
            await CustomError.createError(ErrorMessages.MISSING_DATA, ErrorMessages.ISSUE_PRODUCT);
        }
        // code generator
        let rdm_code = ""
        let random = 0
        for (let i = 0; i < 5; i++) {
            random = Math.floor(Math.random() * title.length)
            rdm_code = rdm_code.concat(random)
        }

        const prod = {
            title: title,
            description: description,
            code: rdm_code,
            price: price,
            status: status ? "false" : "true",
            stock: stock,
            category: category,
            sale: sale ? "true" : "false",
            sale_percent: sale_percent ? sale_percent : 0,
        }
        const product = await createOne(prod)
        res.status(200).json({ message: 'Product created', product })
    } catch (error) {
        next(error)
    }
};

export const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await deleteOne(pid)
        res.status(200).json({ message: 'Product deleted', product })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const modifyProduct = await updateOne(pid, req.body);
        res.status(200).json({ message: "Product has been modified.", modifyProduct });
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const mockingProducts = async (req, res) => {
    try {
        const products = generateAllProducts(100);
        res.status(200).json({ message: "Fake products generated.", products });
    } catch (error) {
        res.status(500).json(error.message)
    }
}
