/**
 * Starts the application and configures CORS
 * The app runs on port 500
 */

const express = require('express');
const cors = require('cors');
const registerRouter = require('./routes/userRoutes/register');
const loginRouter = require('./routes/userRoutes/login');
const updateUser = require('./routes/userRoutes/updateUserRouter');
const getUserInfo = require('./routes/userRoutes/getUserInfo');
const deleteUser = require('./routes/userRoutes/deleteUser');
const logout = require('./routes/userRoutes/logout');
require('dotenv').config();

const uploadProduct = require('./routes/productRoutes/uploadProducts');
const getAllProducts = require('./routes/productRoutes/getAllProducts');
const getCategoryBasedProduct = require('./routes/productRoutes/getCategoryBasedProducts');
const getCampusBasedProducts = require('./routes/productRoutes/getCampusBasedProducts');
const searchProducts = require('./routes/productRoutes/searchProducts');
const getUserProducts = require('./routes/productRoutes/getUserProducts');
const deleteProduct = require('./routes/productRoutes/deleteProduct');
const getProduct = require('./routes/productRoutes/getProduct');
const updateProduct = require('./routes/productRoutes/updateProduct');
const forgotPassword = require('./routes/userRoutes/forgotpassword');
const resetPassword = require('./routes/userRoutes/resetPassword');

const addToCart = require('./routes/cartRoutes/addToCart');
const getCartItems = require('./routes/cartRoutes/getCartItems');
const removeFromCart = require('./routes/cartRoutes/removeFromCart');
const clearCart = require('./routes/cartRoutes/clearCart');

const placeOrder = require('./routes/orderRoutes/placeOrder');
const getUserOrder = require('./routes/orderRoutes/getUserOrder');
const getOrder = require('./routes/orderRoutes/getOrder');

//const { authenticate, authorize} = require('./middlewares/authenticate');
const bodyParser = require('body-parser');
const db = require('./config');
const synchronizeModels = require('./db');
const app = express();

app.use(cors());
app.use(express.static('products/uploads'));

app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//app.use('/api', routes);
app.use('/api/v1', registerRouter);
app.use('/api/v1', loginRouter);
app.use('/api/v1', updateUser);
app.use('/api/v1', getUserInfo);
app.use('/api/v1', deleteUser);
app.use('/api/v1', logout);

app.use('/api/v1', uploadProduct);
app.use('/api/v1', getAllProducts);
app.use('/api/v1', getCategoryBasedProduct);
app.use('/api/v1', getCampusBasedProducts);
app.use('/api/v1', searchProducts);
app.use('/api/v1', getUserProducts);
app.use('/api/v1', deleteProduct);
app.use('/api/v1', getProduct);
app.use('/api/v1', updateProduct);

app.use('/api/v1', addToCart);
app.use('/api/v1', getCartItems);
app.use('/api/v1', clearCart);
app.use('/api/v1', removeFromCart);

app.use('/api/v1', placeOrder);
app.use('/api/v1', getUserOrder);
app.use('/api/v1', getOrder);
app.use('/api/v1', forgotPassword);
app.use('/api/v1', resetPassword);
// Other routes will be added when ready

//const port = 5000;

/**
 * Synchronize the database models and starts the server
 */
synchronizeModels()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server started at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error synchronizing models:`, error);
  });
