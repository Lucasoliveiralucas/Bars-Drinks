const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const SECRET_KEY = process.env.SECRET_KEY;
const SALT = process.env.SALT;
const GOOGLE_API = process.env.GOOGLE_API_KEY;

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
        name: req.body.name,
        email: req.body.email,
        fav_components: req.body.fav_components,
        password: hash,
        age: 18,
        gender: "yes",
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
        bar: data.barName,
        bar_image: data.barImage,
        bar_price: data.barPrice,
        user_comment: data.comment,
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
const findBarsGoogle = async (req, res) => {
  var config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.390%2C2.154&radius=6000&type=bar&keyword=drink&key=${GOOGLE_API}`,
    headers: {},
  };
  try {
    let data = await axios(config);
    let result = JSON.stringify(data.data);
    let parsedResult = JSON.parse(result);
    let nextPageToken = parsedResult.next_page_token;
    let returnData = parsedResult.results;
    for (let i = 0; i < 1; i++) {
      function delay(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }

      await delay(2000);
      var config = {
        method: "get",
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${GOOGLE_API}`,
        headers: {},
      };
      data = await axios(config);
      result = JSON.stringify(data.data);
      parsedResult = JSON.parse(result);
      returnData = [...returnData, ...parsedResult.results];
    }
    res.status(201);
    res.json(JSON.stringify(returnData));
  } catch (error) {
    console.log(error);
  }
};
const findPhotosGoogle = async (req, res) => {
  try {
    if (!req.body[0]) return;
    console.log(req.body[0]);
    // https://maps.googleapis.com/maps/api/place/photo
    //  &photo_reference=${req.body[0]}&key=
    var config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/photo
      ?maxwidth=400&maxheight=200
      &photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT
      &key=${GOOGLE_API}`,
      headers: {},
    };
    data = await axios(config);
    result = await JSON.stringify(data);
    console.log(result);
    // parsedResult = await JSON.parse(result);
    // console.log(parsedResult.data);
    // res.status(201);
    // res.json(JSON.stringify(returnData));
  } catch (error) {
    // console.log(error);
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
  findBarsGoogle,
  findPhotosGoogle,
};
