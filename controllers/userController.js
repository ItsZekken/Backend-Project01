const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Controlador para autenticar a un usuario
exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al autenticar al usuario' });
  }
};


// Controlador para la operación de Crear (Create) un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};


// Controlador para la operación de Leer (Read) todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({ deletedAt: null });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  };
  
  // Controlador para la operación de Leer (Read) un usuario por su ID
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  };


// Controlador para la operación de Actualizar (Update) un usuario por su ID
exports.updateUserById = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { name, email, password, updatedAt: Date.now() },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  };


// Controlador para la operación de Borrar (Delete) un usuario por su ID
exports.deleteUserById = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { deletedAt: Date.now() },
        { new: true }
      );
      if (!deletedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  };
  