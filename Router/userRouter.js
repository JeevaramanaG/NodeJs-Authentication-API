const express = require("express");
const { userCreate, userLogin ,userProfile} = require("../Controller/userCtrl");
const isAuthentication = require("../Middleware/isAuthtentication");
const UserRouter =express.Router();


UserRouter.post("/api/v1/user/register",userCreate);

UserRouter.post("/api/v1/user/login",userLogin);

UserRouter.get("/api/v1/user/profile",isAuthentication,userProfile)

module.exports=UserRouter;