import {Request, Response} from 'express';
import {Order} from '../../models/OrderModel';
import { FilterQuery } from 'mongoose';
import { parseISO, isValid } from 'date-fns';

interface ProcessedDataResult {
  grandTotalValue: number;
  grandTotalQuantity: number;
  products: ProductSummary[];
  filterApplied: {
    startDate?: Date;
    endDate?: Date;
  };
}

interface ProductSummary {
  productName: string;
  totalValue: number;
  totalQuantity: number;
}

function parseDateTime(date?: string, time?: string): Date | undefined {
  if (!date) return undefined;
  const isoString = time
    ? `${date}T${time}:00.000Z`
    : `${date}T00:00:00.000Z`;

  const parsed = parseISO(isoString);
  return isValid(parsed) ? parsed : undefined;
}

export async function listOrdersController(req: Request, res: Response) {
  try {
    const orders = await Order.find().sort({ createdAt: 1 }).populate('products.product');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function listOrdersByDateController(req: Request, res: Response) {
  try {
    const { startDate, startTime, endDate, endTime } = req.query;

    const startTimestamp = parseDateTime(startDate as string, startTime as string);
    const endTimestamp = parseDateTime(endDate as string, endTime as string);

    const matchStage: FilterQuery<any> = {};
    if (startTimestamp || endTimestamp) {
      matchStage.createdAt = {};
      if (startTimestamp) matchStage.createdAt.$gte = startTimestamp;
      if (endTimestamp) matchStage.createdAt.$lte = endTimestamp;
    }

    const aggregation = await Order.aggregate([
      { $match: matchStage },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products", // nome da coleção de produtos no Mongo
          localField: "products.product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$productInfo.name",
          totalQuantity: { $sum: "$products.quantity" },
          totalValue: { $sum: { $multiply: ["$products.quantity", "$productInfo.price"] } }
        }
      },
      { $sort: { totalValue: -1 } }
    ]);

    const products: ProductSummary[] = aggregation.map(item => ({
      productName: item._id,
      totalQuantity: item.totalQuantity,
      totalValue: item.totalValue
    }));

    const grandTotalQuantity = products.reduce((sum, p) => sum + p.totalQuantity, 0);
    const grandTotalValue = products.reduce((sum, p) => sum + p.totalValue, 0);

    const processedData: ProcessedDataResult = {
      grandTotalValue,
      grandTotalQuantity,
      products,
      filterApplied: { startDate: startTimestamp, endDate: endTimestamp }
    };

    return res.json(processedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar o relatório.' });
  }
}
