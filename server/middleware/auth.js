"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(" ")[1];

  try {
    // verify & decode token payload,
    const { id } = jwt.verify(token, SECRET_KEY);
    // attempt to find user object and set to req
    const currentUser = await prisma.user.findFirst({
      where: { id: id },
    });
    if (!currentUser) return res.sendStatus(401);
    req.user = currentUser;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
