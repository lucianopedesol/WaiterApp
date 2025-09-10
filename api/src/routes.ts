import {Router} from 'express';
import multer from 'multer';
import {listCategoriesController} from './app/controllers/categories/listCategoriesController';
import {createCategoriesController} from './app/controllers/categories/createCategoriesController';
import {listProductsController} from './app/controllers/products/listProductsController';
import {createProductsController} from './app/controllers/products/createProductsController';
import path from 'node:path';
import {listProductsByCategoryController} from './app/controllers/categories/listProductsByCategoryController';
import {listOrdersByDateController, listOrdersController} from './app/controllers/orders/listOrdersController';
import {createOrdersController} from './app/controllers/orders/createOrdersController';
import {changeOrderStatusController} from './app/controllers/orders/changeOrderStatusController';
import {cancelOrdersController} from './app/controllers/orders/cancelOrdersController';
import { getProfile, loginUser, registerUser } from './app/controllers/auth/auth';
import { authMiddleware } from './app/middlewares/auth.middleware';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb)  => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

export const router = Router();

// Categories
router.get('/categories', listCategoriesController);
router.get('/categories/:categoryId/products', listProductsByCategoryController);
router.post('/categories', createCategoriesController);


// Products
router.get('/products', listProductsController);
router.post('/products', upload.single('image'), createProductsController);


// Orders
router.get('/orders', listOrdersController);
//GET /orders/report?startDate=2025-09-01&startTime=08:00&endDate=2025-09-01&endTime=18:00
//GET /orders/report?startDate=2025-09-01&endDate=2025-09-05
//GET /orders/report  => all
router.get('/orders/report', listOrdersByDateController);
router.post('/orders', createOrdersController);
router.patch('/orders/:orderId', changeOrderStatusController);
router.delete('/orders/:orderId', cancelOrdersController);

// Rotas de usuário
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/profile', authMiddleware, getProfile);
