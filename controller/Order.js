const Order = require('../models/Order');
const Cart = require('../models/Cart'); // Assuming you have a Cart model



// POST /api/orders/place-order
exports.orderPlacement = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user data is attached to the request

    // Fetch the user's cart data
    const cart = await Cart.findOne({ _Id: userId }).populate('items.productId');

    if (!cart) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total price of the order
    let totalPrice = 0;
    cart.items.forEach((item) => {
      totalPrice += item.items.price * item.qty;
    });

    // Create the order
    const order = new Order({
      user: user._id,
      items: cart.items.map((item) => ({
        productId: item.productId,
        qty: item.qty,
        price:item.price,
        title:item.title,
      })),
      totalPrice,
    });

    await order.save();

    // Clear the user's cart
    await Cart.findOneAndUpdate({ _Id:userId }, { $set: { items: [] } });

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};





// GET /api/orders/history
exports.orderHistory = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming authenticated user data is attached to the request

    // Fetch order history for the user
    const orderHistory = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
        success:true,
        data:orderHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

// GET /api/orders/:orderId
exports.orderDetails = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const userId = req.user._id;
  
      // Fetch the specific order for the authenticated user
      const order = await Order.findOne({ _id: orderId, user: userId });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      return res.status(200).json({
        success:true,
        data:this.orderDetails,

      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };
