const Book = require('../models/book');

// Controlador para la operación de Crear (Create) un nuevo libro
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, publicationDate, publisher } = req.body;
    const newBook = new Book({ title, author, genre, publicationDate, publisher });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

// Controlador para la operación de Leer (Read) todos los libros
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ deletedAt: null });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
};

// Controlador para la operación de Leer (Read) un libro por su ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
};

// Controlador para la operación de Actualizar (Update) un libro por su ID
exports.updateBookById = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

// Controlador para la operación de Borrar (Delete) un libro por su ID
exports.deleteBookById = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      { deletedAt: Date.now() },
      { new: true }
    );
    if (!deletedBook) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};
