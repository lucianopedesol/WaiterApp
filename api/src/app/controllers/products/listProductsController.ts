import {Request, Response} from 'express';
import {Product} from '../../models/ProductModel';

export async function listProductsController(req: Request, res: Response) {
  const products = await Product.find();
  res.json(products);
}

export async function listActiveProductsController(req: Request, res: Response) {
  const products = await Product.find({ active: true });
  res.json(products);
}
