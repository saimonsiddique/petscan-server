const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "is this a secret?";
const Client = require("../models/client.model");
const Vet = require("../models/vet.model");

const authMiddleware = {};

authMiddleware.client = async (req, res, next) => {
  console.log("authMiddleware.client");
  let token = req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) {
    try {
      // Get token from header
      token = token.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get client from token
      req.client = await Client.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      res.send("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    res.send("Not authorized, no token");
  }
};

authMiddleware.vet = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) {
    try {
      // Get token from header
      token = token.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get Vet from token
      req.vet = await Vet.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      res.send("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    res.send("Not authorized, no token");
  }
};

module.exports = authMiddleware;
