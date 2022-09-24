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
    res.json({ message: "error" });
    console.log(error);
  }
};
//test function to check for users in database
const users = async (req, res) => {
  try {
    // const allUsers = await prisma.user.findFirst({
    //   where: { name: "Testuser" },
    // });
    const allUsers = await prisma.user.findMany({});
    res.json(allUsers);
    console.log(allUsers);
  } catch (error) {
    res.json("error getting users");
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
    res.status(200).send({ accessToken });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};
const drinkReviews = async (req, res) => {
  console.log(req.params.drinkId);
  const allReviews = await prisma.reviews.findMany({
    where: { drink_id: req.params.drinkId },
  });
  res.json(allReviews);
  console.log(allReviews);
};
const allDrinkReviews = async (req, res) => {
  const allReviews = await prisma.reviews.findMany({});
  res.json(allReviews);
  console.log(allReviews);
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
    res.json("review created");
    res.status(201);
  } catch (error) {
    console.log(error);
    res.json("error creating review");
    res.status(500);
  }
};

const userData = async (req, res) => {
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await prisma.user.findFirst({
      where: { id },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
    res.json("error getting user");
  }
};

module.exports = {
  createUser,
  users,
  drinkReviews,
  postReview,
  login,
  allDrinkReviews,
  userData,
};
