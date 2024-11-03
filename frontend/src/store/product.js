import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({
      products: data.data,
    });
  },
  createProduct: async (newProduct) => {
    // validate the input
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: "Please complete all fields",
      };
    }
    if (isNaN(Number(newProduct.price))) {
      return {
        success: false,
        message: "Price must be a number",
      };
    }

    // create the product
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (!res.ok) {
      return {
        success: false,
        message: "Internal server error",
      };
    }

    // set the data
    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));

    return {
      success: true,
      message: "Product created successfully",
    };
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      return {
        success: false,
        message: "Couldn't delete product",
      };
    }

    // update the product state
    set((state) => ({
      products: [...state.products.filter((product) => product._id !== pid)],
    }));
    return {
      success: true,
      message: "Product deleted successfully",
    };
  },
  updateProduct: async (pid, updatedProduct) => {
    // validate the input
    if (
      !updatedProduct.name ||
      !updatedProduct.price ||
      !updatedProduct.image
    ) {
      return {
        success: false,
        message: "Please complete all fields",
      };
    }
    if (isNaN(Number(updatedProduct.price))) {
      return {
        success: false,
        message: "Price must be a number",
      };
    }

    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    if (!res.ok) {
      return {
        success: false,
        message: "Internal server error",
      };
    }

    // set the products with the updated data
    const data = await res.json();
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return {
      success: true,
      message: "Product updated successfully",
    };
  },
}));
