import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const handleRefreshToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.refreshToken)
      return res.status(400).send({ message: "Something goes wrong." });

    const refreshToken = cookies.refreshToken;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).send({ message: "Something goes wrong." });
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      console.log("handleRefreshToken", token);
      return res.status(200).send({ token });
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export const clearRefreshToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken)
      return res.status(200).send({ message: "Success" });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).send({ status: "success" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export const protectedRoute = async (req, res, next) => {
    try {
        res.send({message: 'You are authenticated' + ' data: ' + req.body.data})
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}