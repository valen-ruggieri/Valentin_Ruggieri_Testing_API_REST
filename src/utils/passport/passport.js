const passport = require("passport");
const { userDao } = require("../../DAOs/swicht");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userDao.getById(id);
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
      const exists = await userDao.getByUser({ email });

      if (!exists) {
        const { name, userType } = req.body;
        const userSignIn = await userDao.create({
          user: name,
          email: email,
          password: userDao.encryptPassword(password),
          userType: userType,
        });

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
      const user = await userDao.getByUser({ email });
      if (!user) {
        return done(null, false);
      }
      if (!(await userDao.comparePassword(password, user.password))) {
        return done(null, false);
      }

      done(null, user);
    }
  )
);
