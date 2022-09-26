const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY;
const SALT = process.env.SALT;

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    const password = req.body.password;
    if (user)
      return res
        .status(409)
        .json({ error: "409", message: "Email already registered" });
    if (password < 8)
      return res.status(409).send({
        error: "409",
        message: "Password must be at least 8 characters",
      });
    const hash = bcrypt.hashSync(password, +SALT);
    await prisma.user.create({
      data: {
        ...req.body,
        password: hash,
      },
    });
    const { id } = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    const accessToken = jwt.sign({ id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (error) {
    res.json({ message: "Error creating user" });
    console.log(error);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = await prisma.user.findFirst({
      where: { email: email },
    });
    const validatedPass = await bcrypt.compare(password, currentUser.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ id: currentUser.id }, SECRET_KEY);
    res
      .status(200)
      .send({ accessToken, user: { ...currentUser, password: null } });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};
const drinkReviews = async (req, res) => {
  try {
    const allReviews = await prisma.reviews.findMany({
      where: { drink_id: req.params.drinkId },
    });
    res.json(allReviews);
  } catch (error) {
    console.log(error);
  }
};
const allDrinkReviews = async (req, res) => {
  try {
    const allReviews = await prisma.reviews.findMany({});
    res.status(200);
    res.json(allReviews);
  } catch (error) {}
};

const postReview = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    await prisma.reviews.create({
      data: {
        drink_id: data.drinkId,
        rating_: +data.score,
        bar: data.bar,
        User: {
          connect: { id: data.userId },
        },
      },
    });
    res.status(201);
    res.json("review created");
  } catch (error) {
    console.log(error);
    res.json("error creating review");
    res.status(500);
  }
};

const userData = async (req, res) => {
  try {
    const reviews = await prisma.reviews.findMany({
      where: { userId: req.user.id },
    });
    res.json(reviews).status(201);
  } catch (error) {
    console.log(error);
    res.json("error getting user");
  }
};
const refresh = async (req, res) => {
  try {
    const currentUser = await prisma.user.findFirst({
      where: { id: req.user.id },
    });
    if (!currentUser) return res.sendStatus(401);
    const user = { ...currentUser, password: null };
    res.json(user);
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = {
  createUser,
  drinkReviews,
  postReview,
  login,
  allDrinkReviews,
  userData,
  refresh,
};
