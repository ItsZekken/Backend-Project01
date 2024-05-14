const Order = require('../models/order');

// Controlador para crear un nuevo pedido
exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const newOrder = new Order({ userId, items });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

// Controlador para obtener todos los pedidos con filtros
exports.getAllOrders = async (req, res) => {
  try {
    let filter = { deletedAt: null };
    
    // Aplicar filtro por fecha de creación (entre dos fechas)
    if (req.query.startDate && req.query.endDate) {
      filter.createdAt = { $gte: new Date(req.query.startDate), $lte: new Date(req.query.endDate) };
    } else if (req.query.startDate) {
      filter.createdAt = { $gte: new Date(req.query.startDate) };
    } else if (req.query.endDate) {
      filter.createdAt = { $lte: new Date(req.query.endDate) };
    }
    
    // Aplicar filtro por estado del pedido
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const orders = await Order.find(filter);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

// Controlador para obtener un pedido por su ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
};

// Controlador para actualizar un pedido por su ID
exports.updateOrderById = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
};

// Controlador para eliminar un pedido por su ID
exports.deleteOrderById = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { deletedAt: Date.now() },
      { new: true }
    );
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
};