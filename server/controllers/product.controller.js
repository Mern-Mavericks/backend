// controllers/product.controller.js
import Product from '../models/product.model.js';

const listProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).exec();
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: 'Could not retrieve products' });
  }
};


// Function to add a new product
const addProduct = async (req, res) => {
    const productData = req.body;
  
    try {
      const newProduct = new Product(productData);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ error: 'Could not add product' });
    }
  };

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: 'Could not update product' });
    }
};
  
// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndRemove(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: 'Could not delete product' });
    }
  };
  
// Get a product by ID
const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: 'Could not fetch product' });
    }
};

// Delete all products
const deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany({});
      res.json({ message: 'All products deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: 'Could not delete products' });
    }
  };
export default { listProducts, addProduct, updateProduct, deleteProduct, getProductById, deleteAllProducts };
