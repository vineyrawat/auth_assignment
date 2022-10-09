const router = require("express").Router();
const auth = require("../../../services/auth");
const {
  validateAuthentication,
} = require("../../../services/middlewares/auth");

router.post("/create", auth.create);
router.post("/login", validateAuthentication, auth.login);

module.exports = router;
