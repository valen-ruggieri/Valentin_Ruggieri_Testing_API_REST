require("dotenv").config();
const passport = require("passport");
const { createCart } = require("../../Repository/cartsRepository");
const {
  createUser,
  searchUserById,
  searchUserByEmail,
  encryptPassword,
  comparePassword,
} = require("../../Repository/usersRepository");

const { sendMailWelcome } = require("../nodeMailer/nodeMailer");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await searchUserById(id);
  done(null, user);
});

passport.use(
  "signUp",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const exists = await searchUserByEmail(email);

      if (!exists) {
        const cartInit = {
          precioTotal: 0,
          products: [],
        };
        const cart = await createCart(cartInit);
        const cartUID = cart._id;
        const { name, userType, address, age, phone } = req.body;
        const image = req.file.filename;
        const userSignIn = await createUser({
          user: name,
          email: email,
          password: await encryptPassword(password),
          userType: userType,
          address: address,
          age: age,
          phone: phone,
          image: image,
          cartId: cartUID,
        });

        sendMailWelcome(name, email, userType, address, age, phone);
        return done(null, userSignIn);
      }
      if (exists) {
        return done(null, false);
      }
    }
  )
);

passport.use(
  "signIn",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await searchUserByEmail(email);
      if (!user) {
        return done(null, false);
      }
      if (!comparePassword(password, user.password)) {
        return done(null, false);
      }

      done(null, user);
    }
  )
);
