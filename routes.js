const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');
const orderController = require('./controllers/orderController');
const { verifyToken } = require('./middlewares/authMiddleware');

// Rutas para el modelo de Usuario
router.post('/users', userController.createUser);
router.get('/users', verifyToken, userController.getAllUsers);
router.get('/users/:userId', verifyToken, userController.getUserById);
router.put('/users/:userId', verifyToken, userController.updateUserById);
router.delete('/users/:userId', verifyToken, userController.deleteUserById);

// Rutas para el modelo de Libros
router.post('/books', verifyToken, bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/:bookId', bookController.getBookById);
router.put('/books/:bookId', verifyToken, bookController.updateBookById);
router.delete('/books/:bookId', verifyToken, bookController.deleteBookById);

// Rutas para el modelo de Pedidos
router.post('/orders', verifyToken, orderController.createOrder);
router.get('/orders', verifyToken, orderController.getAllOrders);
router.get('/orders/:orderId', verifyToken, orderController.getOrderById);
router.put('/orders/:orderId', verifyToken, orderController.updateOrderById);
router.delete('/orders/:orderId', verifyToken, orderController.deleteOrderById);

// Rutas para Login
router.post('/auth/login', userController.authenticateUser);

module.exports = router;