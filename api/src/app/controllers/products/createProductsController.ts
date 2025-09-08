import {Request, Response} from 'express';
import {Product} from '../../models/ProductModel';

export async function createProductsController(req: Request, res: Response) {
  try {
    const { name, price, description, category, ingredients } = req.body;
    const imagePath = req.file?.filename;

    const product = await Product.create({
      name,
      price,
      description,
      imagePath,
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
