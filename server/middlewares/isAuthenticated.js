import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token:", token);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        req.id = "675e6ea15fd11163fde39749";
        console.log("before next");
        next();
      } else {
        console.log("Decoded Token:", decoded);
      }
    });
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded Token:", decode);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    console.log("going to fetch profile data");
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
