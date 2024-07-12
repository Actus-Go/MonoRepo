const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { ROLES } = require('../constants');
const keys = require('../config/keys');
const User = mongoose.model('User');

const support = require('./support');
const share = require('./handleSharedProducts');
const split = require('./handleSplitedProduct');
const SharedProduct = require('../models/sharedProduct');

const authHandler = async (socket, next) => {
  // const { token = null } = socket.handshake.auth;
  
  const token = socket.handshake.auth.token ?? socket.handshake.headers.auth;
  if (token) {
    const [authType, tokenValue] = token.trim().split(' ');
    if (authType !== 'Bearer' || !tokenValue) {
      return next(new Error('no token'));
    }

    // attach the token of the user to the socket
    socket.token = token;

    const { secret } = keys.jwt;
    const payload = jwt.verify(tokenValue, secret);
    const id = payload.id.toString();
    const user = await User.findById(id);

    if (!user) {
      return next(new Error('no user found'));
    }

    const u = {
      id,
      role: user.role,
      email: user.email,
      isAdmin: user.role === ROLES.Admin,
      name: `${user.firstName} ${user.lastName}`,
      socketId: socket.id,
      messages: []
    };

    // Attach the user to the socket
    socket.user = id;

    const existingUser = support.findUserById(id);
    if (!existingUser) {
      support.users.push(u);
    } else {
      existingUser.socketId = socket.id;
    }
  } else {
    return next(new Error('no token'));
  }

  next();
};


// Middleware to check if the all sharedproducts are valid or not
const checkAllSharedProducts = async () => {
  const sharedProducts = await SharedProduct.find({ isActive: true });
  if (!sharedProducts) {
    console.log('No shared products found.');
    return;
  }
  const now = Date.now();
  const fiveMin = 5 * 60 * 1000;
  const updates = sharedProducts.map(async product => {
    const givenDate = new Date(product.createdAt);
    const diff = now - givenDate;
    if (diff > fiveMin) {
      console.log(`Updating product ${product._id} as inactive.`);
      await SharedProduct.findByIdAndUpdate(product._id, { isActive: false });
    }
  });

  await Promise.all(updates);
  console.log('All shared products have been checked and updated.');
};

checkAllSharedProducts();
let io;
const socket = server => {
  io = socketio(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },

  });

  io.use(authHandler);

  // const onConnection = socket => {
  //   support.supportHandler(io, socket);
  // };

  // io.on('connection', onConnection);
  // io.on('connection', (socket) => {
  //   console.log(`Connected with socket ${socket.id}`)

  //   socket.on('chat', (data) => {
  //     console.log(data);
  //     io.emit('chat', 'yessssssss');
  //   });
  // });


  const handleSharedProducts = (socket) => {
    share(io, socket);
  };
  io.on('connection', (socket) => {console.log('connected');});
  io.on('connection', handleSharedProducts);
  io.on('connection', (socket) => {
    split(io, socket);
  });
  return io;
};

module.exports = socket;