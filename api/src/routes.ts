import {Router} from 'express';
import multer from 'multer';
import path from 'node:path';
import {listCategoriesController} from './app/controllers/categories/listCategoriesController';
import {listProductsByCategoryController} from './app/controllers/categories/listProductsByCategoryController';
import {createCategoriesController, updateCategoryController} from './app/controllers/categories/createCategoriesController';
import {listProductsController, listActiveProductsController} from './app/controllers/products/listProductsController';
import {createProductsController, updateProductController} from './app/controllers/products/createProductsController';
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
router.get('/categories', authMiddleware, listCategoriesController);
router.get('/categories/:categoryId/products', authMiddleware, listProductsByCategoryController);
router.post('/categories', authMiddleware, createCategoriesController);
router.patch('/categories/:id', authMiddleware, updateCategoryController);


// Products
router.get('/products', authMiddleware, listProductsController);
router.get('/app/products', authMiddleware, listActiveProductsController);
router.post('/products', authMiddleware, upload.single('image'), createProductsController);
router.patch('/products/:id', authMiddleware, upload.single('image'), updateProductController);


// Orders
router.get('/orders', authMiddleware, listOrdersController);
//GET /orders/report?startDate=2025-09-01&startTime=08:00&endDate=2025-09-01&endTime=18:00
//GET /orders/report?startDate=2025-09-01&endDate=2025-09-05
//GET /orders/report  => all
router.get('/orders/report', authMiddleware, listOrdersByDateController);
router.post('/orders', authMiddleware, createOrdersController);
router.patch('/orders/:orderId', authMiddleware, changeOrderStatusController);
router.delete('/orders/:orderId', authMiddleware, cancelOrdersController);

// Rotas de usuário
router.post('/user/register', authMiddleware, registerUser);
router.post('/user/login', loginUser);
router.get('/user/profile', authMiddleware, getProfile);
