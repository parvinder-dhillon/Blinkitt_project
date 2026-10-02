import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers?.authorization?.split(" ")[1]; // ["bearer", "token"]

    console.log("Headers:", req.headers);
    console.log("Authorization:", req.headers.authorization);
    console.log("token", token);
    console.log(req.cookies, "this is cookie");

    if (!token) {
      return res.status(401).json({
        message: "Provide token",
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    console.log(decode, "decode");

    if (!decode) {
      return res.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }

    req.userId = decode.id;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    return res.status(500).json({
      message: "You have not Login",
      error: true,
      success: false,
    });
  }
};

export default auth;
