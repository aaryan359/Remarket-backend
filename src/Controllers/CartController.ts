import { Request, Response } from "express";
import Cart from "../Models/Cart.model";
import Product from "../Models/Product.model";

const addtocart = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user._id;                   // Get user ID from JWT or session
    const { productId, quantity } = req.body;

    // Validate inputs
    if (!productId || !quantity) {
      return res.status(400).json(
        { success: false,
        message: "Product ID and quantity are required" 
    });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json(
        { success: false,
        message: "Product not found" 
        });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // If the cart exists, check if the product is already in the cart
      const productIndex = cart.items.findIndex((item) => item.product.toString() === productId);

      if (productIndex > -1) {
        // Product exists, update the quantity
        cart.items[productIndex].quantity += quantity;
      } else {
        // Product doesn't exist, add it to the cart
        cart.items.push({ product: productId, quantity });
      }

      
      // Save the updated cart
      await cart.save();
    } 
    else {
      // If no cart exists, create a new cart
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
      await cart.save();
    }

    // Send response back to the client
    res.status(200).json({ success: true, message: "Product added to cart", cart });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default addtocart;
