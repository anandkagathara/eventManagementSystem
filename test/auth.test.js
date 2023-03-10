const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const assert = require('assert');
const User = require('../src/models/user.model');
const authService = require('../src/services/auth.service');

describe('Auth Service', function () {
  let testUser;

  before(async function () {
    // Connect to the database
    await mongoose.connect('mongodb://localhost:27017/event-management', { useNewUrlParser: true, useUnifiedTopology: true });
  });
  
  after(async function () {
    // Disconnect from the database
    await mongoose.disconnect();
  });

  beforeEach(async function () {
    // Create a test user
    const email = 'testuser@example.com';
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    testUser = await user.save();
  });

  afterEach(async function () {
    // Delete the test user
    await User.deleteOne({ _id: testUser._id.toString() });
  });

  describe('createUser', function () {
    it('should create a new user', async function () {
      const userData = {
        email: 'newuser@example.com',
        password: 'newpassword'
      };
      const user = await authService.createUser(userData);
      assert(user);
      assert.equal(user.email, userData.email);
      const isMatch = await bcrypt.compare(userData.password, user.password);
      assert(isMatch);
      await User.deleteOne({ _id: user._id.toString() });
    });
  });

  describe('loginUser', function () {
    it('should return a JWT token for a valid user', async function () {
      const userData = {
        email: testUser.email,
        password: 'password'
      };
      const token = await authService.loginUser(userData);
      assert(token);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      assert.equal(decodedToken.userId, testUser._id.toString());
    });

    it('should throw an error for an invalid user', async function () {
      const userData = {
        email: 'invaliduser@example.com',
        password: 'invalidpassword'
      };
      try {
        await authService.loginUser(userData);
      } catch (error) {
        assert.equal(error.message, 'User not found');
      }
    });

    it('should throw an error for an incorrect password', async function () {
      const userData = {
        email: testUser.email,
        password: 'invalidpassword'
      };
      try {
        await authService.loginUser(userData);
      } catch (error) {
        assert.equal(error.message, 'Incorrect password');
      }
    });
  });
});
