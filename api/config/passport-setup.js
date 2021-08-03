const passport = require("passport");
const keys = require("./keys");
const User = require("../models/user-model");
const SteamStrategy = require("passport-steam");

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://dev.wojciechbajer.com:9000/auth/steam/return",
      realm: "http://dev.wojciechbajer.com:9000/",
      apiKey: "BD5A8854ECF7DC113CA3243511D7BA29",
    },
    async (identifier, profile, done) => {
      // find current user in UserModel
      console.log(profile);
      const currentUser = await User.findOne({
        steamId: profile.id
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          provider: "steam",
          steamId: profile.id,
          displayName: profile.displayName,
          photos: [
            {
              value: profile.photos[0].value,
            },
            {
              value: profile.photos[1].value,
            },
            {
              value: profile.photos[2].value,
            },
          ],
        }).save();
        if (newUser) {
          return done(null, newUser);
        }
      }
      return done(null, currentUser);
    }
  )
);
