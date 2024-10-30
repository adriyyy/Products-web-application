import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ succes: true, data: products });
  } catch (error) {
    console.error("There was an error in fetching products", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    res
      .status(400)
      .json({ success: false, message: "PLease complete all fields" });
  }

  try {
    const newProduct = await Product.create(product);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid product Id" });
  }

  try {
    const newProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ succes: true, data: newProduct });
  } catch (error) {
    console.error("Error in deleting product", error.message);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};
