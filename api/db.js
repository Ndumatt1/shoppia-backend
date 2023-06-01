const User = require('./models/users');
const Product = require('./models/product');
const Review = require('./models/reviews');
const Cart = require('./models/cart');
const Order = require('./models/order');
const sequelize = require('./config');

// Define associations and synchronize models
async function synchronizeModels() {
  try {
    // Synchronize models
    await User.sync({ force: false });
    await Product.sync({ force: false });
    await Review.sync({ force: false });
    await Order.sync({ force: false });
    await Cart.sync({ force: false });

    // Define associations
    User.hasMany(Product, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Product.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

    User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Review.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

    Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
    Review.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });

    User.hasMany(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Cart.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

    Product.hasMany(Cart, { foreignKey: 'productId', onDelete: 'CASCADE' });
    Cart.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });

    User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

    Product.hasMany(Order, { foreignKey: 'productId', onDelete: 'CASCADE' });
    Order.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });

    Order.hasMany(Cart, { foreignKey: 'orderId', onDelete: 'CASCADE' });
    Cart.belongsTo(Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });

    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

// Export the function to synchronize models and define associations
module.exports = synchronizeModels;
