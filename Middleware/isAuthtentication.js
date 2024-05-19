const express = require("express");
const asyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");

const isAuthentication = asyncHandler((req, res, next) => {
  const headerObj = req.headers.authorization;
  if (!headerObj) {
    return res.status(401).send("Unauthorized");
  }

  // Extract token
  const token = headerObj.split(" ")[1];

  // Verify token
  JWT.verify(token, "Jeeva", (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }
    // Attach user information to the request object
    req.user = decoded.id;
    next();
  });
});

module.exports = isAuthentication;
