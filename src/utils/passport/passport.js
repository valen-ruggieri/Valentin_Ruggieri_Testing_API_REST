const passport = require("passport");
const { userDao } = require("../../DAOs/swicht");
const MongoDBUser = require("../../DAOs/users/MongoDBUserSessions");
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
      const { name, userType } = req.body;

      console.log(name, userType, email, password);
      req.session.user = name;
      req.session.email = email;
      req.session.password = userDao.encryptPassword(password);
      req.session.usertype = userType;

      const userSignIn = await userDao.create({
        user: req.session.user,
        email: req.session.email,
        password: req.session.password,
        userType: req.session.usertype,
      });

      done(null, userSignIn);
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
      if(!user){
        console.log("no existe el usuario");
        return done(null,false)
      }
      if (!await userDao.comparePassword(password, user.password)) {
         console.log("la contrasena es incorrecta");
        return done(null,false)
      }

      console.log("inicio sesion correctamente");
      done(null, user);
    }
  )
);
