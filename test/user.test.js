const assert = require("assert");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../src/models/user.model");
const userService = require("../src/services/user.service");

describe("User Service", function () {
  let testUser;

  before(async function () {
    // Connect to the database
    await mongoose.connect("mongodb://localhost:27017/event-management", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async function () {
    // Disconnect from the database
    await mongoose.disconnect();
  });

  beforeEach(async function () {
    // Create a test user
    const email = "testuser@example.com";
    const firstName = "Demo";
    const password = "password";
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, firstName : firstName });
    testUser = await user.save();
  });

  afterEach(async function () {
    // Delete the test user
    await User.deleteOne({ _id: testUser._id.toString() });
  });

  describe("getUserById", function () {
    it("should return a user by ID", async function () {
      const user = await userService.getUserById(testUser._id);
      assert(user);
      assert.equal(user.email, testUser.email);
    });
  });

  describe("updateUser", function () {
    it("should update user details", async function () {
      const updatedName = "New Demo";
      const updatedUser = await userService.updateUser(testUser._id, { firstName: updatedName }, { new : true});
      assert(updatedUser);
      assert.equal(updatedUser.firstName, updatedName);
    });

    it("should not update user details with invalid input", async function () {
      const updatedUser = await userService.updateUser(testUser._id, { invalidField: "invalidValue" }, { new : true });
      assert(testUser, updatedUser);
    });
  });

  describe("deleteUser", function () {
    it("should delete user by ID", async function () {
      const deletedUser = await userService.deleteUser(testUser._id.toString());
      assert(deletedUser);
      assert.equal(deletedUser.email, testUser.email);
    });
  });

  describe("updatePhoto", function () {
    it("should update user photo", async function () {
      const photoUrl = "C:\Users\bholu\Downloads\Difference-between-SQL-and-NOSQL-2.png";
      const updatedUser = await userService.updateProfileImage(testUser._id, photoUrl);
      assert(updatedUser);
      assert.equal(updatedUser.profilePhotoUrl, photoUrl);
    });
  });
});
