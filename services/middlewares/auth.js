const jsonwebtoken = require("jsonwebtoken");

function validateAuthentication(req, res, next) {
  const token = req.headers[process.env.TOKEN_HEADER_KEY];
  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (e) {
    res.status(403).json({
      isError: true,
      errorCode: "INVALID_TOKEN",
    });
  }
}
module.exports = { validateAuthentication };
