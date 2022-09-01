require("dotenv").config();
const passport = require("passport");
const { userDao } = require("../../DAOs/swicht");
const LocalStrategy = require("passport-local").Strategy;
const nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: `${process.env.MAIL_USER}`,
    pass: `${process.env.MAIL_PASS}`,
  },
});
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
        const { name, userType, address, age, phone } = req.body;
        const image = req.file.filename
        const userSignIn = await userDao.create({
          user: name,
          email: email,
          password: userDao.encryptPassword(password),
          userType: userType,
          address: address,
          age: age,
          phone: phone,
          image: image,
        });
        const mailOptions = {
          from: "ShopBasic <valeru.251@gmail.com>",
          to: email,
          subject: "Bienvenida",
          html: `<h1>Buenos dias ${name} nos da gusto tenerte en shopBasic!! 👋</h1>
          <h2>Datos de registro</h2>
          <h4>Nombre: ${name }</h4>
          <h4>Email: ${ email}</h4>
          <h4>Tipo de usuario: ${ userType}</h4>
          <h4>Direccion: ${ address}</h4>
          <h4>Edad: ${ age}</h4>
          <h4>Telefono: ${phone }</h4>
        `,
        };

        await transporter.sendMail(mailOptions);
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
