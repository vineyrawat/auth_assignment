const router = require("express").Router();
const authRouter = require("./auth");

router.get("/", (req, res, next) => {
  res.json({ msg: "hello" });
});

router.use("/auth", authRouter);

module.exports = router;
