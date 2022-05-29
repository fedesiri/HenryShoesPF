import User from "../models/User.js";
import dotenv from "dotenv";
import Role from "../models/Role.js";
import ShoppingCart from "../models/ShoppingCart.js";
import nodemailer from "nodemailer";

dotenv.config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "store.henry.shoes@gmail.com",
    pass: "bctgrvsmdyqhacge",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//*funciona
export const signUpService = async (req, res) => {
  // console.log("TENGO PROBLEMAS", req.body);
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(400).send("User already exists");
    } else {
      const newUser = await User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      if (req.body.role === "admin") {
        const roleUser = await Role.findOne({
          where: {
            name: "admin",
          },
        });
        await roleUser.addUser(newUser);
      } else {
        const roleUser = await Role.findOne({
          where: {
            name: "user",
          },
        });
        await roleUser.addUser(newUser);
      }
      const newCart = await ShoppingCart.create({});
      await newUser.addShoppingCart(newCart);

      const mailOptions = {
        from: ` "Verify your email" <${"store.henry.shoes@gmail.com"}>`,
        to: newUser.email,
        subject: "Verify your email",
        html: `<h1>Welcome ${newUser.name}</h1>
        <h4>Please verify your email to continue...</h4>
                    <a href="http://${req.headers.host}/signup/verify-email?id=${newUser.id}">Verify Your Email</a>`,
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent to mail user account");
        }
      });

      return {
        id: newUser.id,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        ShoppingCart: newCart,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
