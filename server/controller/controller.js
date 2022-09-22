// "use strict";
//
// const getReview = async (req, res) => {};
//
// const postReview = async (req, res) => {};
//
// module.exports = { getReview, postReview };

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  await prisma.user.create({
    data: {
      name: "Lucas",
      email: "lucas@email",
      Reviews: {
        create: [
          {
            drink_id: "1237863",
            rating_: 33,
            bar: "wilson2",
          },
        ],
      },
    },
  });
};

const users = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
    console.log(allUsers);
  } catch (error) {
    res.json("error getting users");
  }
};
const drinkReviews = async (req, res) => {
  // console.log(req.params.drinkId);
  const allReviews = await prisma.reviews.findMany({
    where: { drink_id: req.params.drinkId },
  });
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
    res.json("error creating review");
    res.status(500);
  }
};

module.exports = { createUser, users, drinkReviews, postReview };
