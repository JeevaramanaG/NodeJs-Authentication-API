const express = require("express");
const { userCreate, userLogin } = require("../Controller/userCtrl");
const UserRouter =express.Router();


UserRouter.post("/api/v1/user/register",userCreate);

UserRouter.post("/api/v1/user/login",userLogin);


module.exports=UserRouter;