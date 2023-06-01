const Cart = require('../../models/cart');
const Order = require('../../models/order');
const Product = require('../../models/product');
const User = require('../../models/users');
const nodeMailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' });

const shoppiaEmail = process.env.EMAIL;
const pass = process.env.PASS;

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: shoppiaEmail,
    pass: pass
  }
});

const sendOrderConfirmationEmail = async (sellerEmail, user, cartItems, sellerGrandTotal) => {
  const mailOptions = {
    from: shoppiaEmail,
    to: sellerEmail,
    subject: 'New Order Placed',
    html: `
      <p>A new order has been placed!</p>
      <p>User Information:</p>
      <p>Name: ${user.firstname} ${user.lastname}</p>
      <p>Phone Number: ${user.phonenumber}</p>
      <h3>Ordered Products:</h3>
      <ul>
        ${cartItems
          .map(
            (cartItem) => `
              <li>
                <h4>${cartItem.Product.title}</h4>
                <img src="${cartItem.Product.imageUrl}" alt="${cartItem.Product.title}" />
                <p>Price Per Unit: ₦${cartItem.Product.price}</p>
                <p>Quantity: ${cartItem.quantity}</p>
                <p>Total Price: ₦${Number(cartItem.totalPrice).toFixed(2)}</p>
              </li>
            `
          )
          .join('')}
      </ul>
      <p>Grand Total: ₦${Number(sellerGrandTotal).toFixed(2)}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

const placeOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all cart items for the user
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product, include: { model: User } }],
    });

    if (cartItems.length === 0) {
      return res.status(200).json({ message: 'Your cart is empty!' });
    }

    // Calculate the grand total price
    const grandTotal = cartItems.reduce((total, cartItem) => {
      return parseFloat(total) + parseFloat(cartItem.totalPrice);
    }, 0).toFixed(2);

    // Group cart items by seller
    const cartItemsBySeller = {};
    // Get the user information
    const user = await User.findByPk(userId);

    cartItems.forEach((cartItem) => {
      const sellerId = cartItem.Product.User.id;
      if (!cartItemsBySeller[sellerId]) {
        cartItemsBySeller[sellerId] = [];
      }
      cartItemsBySeller[sellerId].push(cartItem);
    });

    // Send order confirmation emails to each seller asynchronously
    const emailPromises = Object.entries(cartItemsBySeller).map(async ([sellerId, cartItems]) => {
      const seller = await User.findByPk(sellerId);
      const sellerEmail = seller.email;
      const sellerGrandTotal = cartItems.reduce((total, cartItem) => {
        return total + parseFloat(cartItem.totalPrice);
      }, 0);

      // Send individual order confirmation email to each seller
      return sendOrderConfirmationEmail(sellerEmail, user, cartItems, sellerGrandTotal);
    });

    // Create order entries for each product in the cart
    const orderEntries = await Promise.all(
        cartItems.map(async (cartItem) => {
          const { productId, quantity, totalPrice } = cartItem;
          const product = await Product.findByPk(productId);
          const order = await Order.create({
            userId,
            productId,
            quantity,
            price: product.price,
            totalPrice,
          });
          return order;
        })
      );


    // Wait for all email promises to resolve
    await Promise.all(emailPromises);  
    // Clear the user's cart after placing the order
    await Cart.destroy({ where: { userId } });

    // Create order entries for each product in the cart
    return res.status(200).json({ orderEntries, grandTotal });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ error: 'Failed to place order' });
  }
};

module.exports = placeOrder;