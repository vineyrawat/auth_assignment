const { PrismaClient } = require("@prisma/client");
const jsonwebtoken = require("jsonwebtoken");

const prisma = new PrismaClient();

module.exports = {
  create: async function (req, res, next) {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        isError: true,
        errorCode: "INVALID_DETAILS",
      });
    }
    // check if user already exist or not with same email
    const existedUser = await prisma.user.findUnique({ where: { email } });
    if (existedUser) {
      return res.status(400).json({
        isError: true,
        errorCode: "EMAIL_ALREADY_REGISTERED",
      });
    }
    // create user with details
    const user = await prisma.user.create({ data: { name, email, password } });
    const token = jsonwebtoken.sign(
      { email: user.email, role: user.role, id: user.id },
      process.env.JWT_SECRET_KEY
    );
    res.status(201).json({ token });
  },
  login: async function (req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        isError: true,
        errorCode: "INVALID_DETAILS",
      });
    }
    // find user with given credentials
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          email,
          password,
        },
      });
      const token = jsonwebtoken.sign(
        {
          email: user.email,
          role: user.role,
          id: user.id,
        },
        process.env.JWT_SECRET_KEY
      );
      return res.json({ token });
    } catch (e) {
      res.status(400).json({
        isError: true,
        errorCode: "INVALID_CREDENTIALS",
      });
    }
  },
};
