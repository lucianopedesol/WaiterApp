import {Request, Response} from 'express';
import {Order} from '../../models/OrderModel';

export async function listOrdersController(req: Request, res: Response) {
  try {
    const orders = await Order.find().sort({ createdAt: 1 }).populate('products.product');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
