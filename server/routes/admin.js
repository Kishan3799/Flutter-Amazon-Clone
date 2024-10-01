import express from 'express';
import admin from '../middleware/admin.js'
import { Product } from '../models/product.js';
import Order from '../models/order.js';
const adminRouter = express.Router();

//add product 
adminRouter.post('/api/admin/add-product', admin, async (req,res) => {
    try {
        const { name, description, images, quantity, price, category } = req.body;
        let product = new Product({
            name,
            description,
            images, 
            quantity, 
            price, 
            category
        });
        product = await product.save();
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//get all the product 
adminRouter.get('/api/admin/get-products', admin, async (req,res) => {
    try {
        const proudcts = await Product.find({});
        res.json(proudcts);

    } catch (e) {
        res.status(500).json({error:e.messsage});
    }
});

//Delete the product 
adminRouter.post('/api/admin/delete-product', admin, async (req,res) => {
    try {
        const {id} = req.body;
        let product = await Product.findByIdAndDelete(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({error:e.message});
    }
})

adminRouter.get("/admin/get-orders", admin, async (req, res) => {
    try {
      const orders = await Order.find({});
      res.json(orders);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

adminRouter.post("/admin/change-order-status", admin, async (req, res) => {
    try {
      const { id, status } = req.body;
      let order = await Order.findById(id);
      order.status = status;
      order = await order.save();
      res.json(order);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

adminRouter.get('/admin/analytics', admin ,async (req,res)=>{
    try {
        const orders = await Order.find({});
        let totalEarnings = 0;
    
        for (let i = 0; i < orders.length; i++) {
          for (let j = 0; j < orders[i].products.length; j++) {
            totalEarnings +=
              orders[i].products[j].quantity * orders[i].products[j].product.price;
          }
        }
        // CATEGORY WISE ORDER FETCHING
        let mobileEarnings = await fetchCategoryWiseProduct("Mobiles");
        let essentialEarnings = await fetchCategoryWiseProduct("Essentials");
        let applianceEarnings = await fetchCategoryWiseProduct("Appliances");
        let booksEarnings = await fetchCategoryWiseProduct("Books");
        let fashionEarnings = await fetchCategoryWiseProduct("Fashion");
    
        let earnings = {
          totalEarnings,
          mobileEarnings,
          essentialEarnings,
          applianceEarnings,
          booksEarnings,
          fashionEarnings,
        };
    
        res.json(earnings);
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
});

async function fetchCategoryWiseProduct(category) {
    let earnings = 0;
    let categoryOrders = await Order.find({
      "products.product.category": category,
    });
  
    for (let i = 0; i < categoryOrders.length; i++) {
      for (let j = 0; j < categoryOrders[i].products.length; j++) {
        earnings +=
          categoryOrders[i].products[j].quantity *
          categoryOrders[i].products[j].product.price;
      }
    }
    return earnings;
}

export default adminRouter;

