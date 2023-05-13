const express = require("express");
const userController = require("./../controllers/userController");
const userRouter = express.Router();
const auth = require("./../middleware/auth")
const loggerMiddleware = require("./../middleware/logger");

userRouter
.route("/")
.get(userController.getUsers)
.post(userController.createUser)

userRouter
.route("/:id")
.patch(userController.editUser)
.delete(userController.deleteUser)

userRouter
.route("/signup")
.post(userController.signup)

userRouter
.route("/login")
.post(userController.login)

userRouter
.route("/logout")
.get(userController.logout)

userRouter
.route("/loggedIn")
.get(userController.loggedIn)

userRouter
.route("/getName")
.get(userController.getName)

module.exports = userRouter;