f you do use sensitive scopes, you should update the scopes section of the OAuth consent screen configuration to include all sensitive scopes you are requesting before the 'submit for verification' button becomes available. In order to add your sensitive scopes on the configuration page, you need to enable the APIs you would like your project to access. For example, enable the GMail APIs for your project by visiting the API library, then add the GMail scopes to your consent screen configuration, fill out additional information, submit for verification.




If your public application uses scopes that permit access to certain user data, it must complete a verification process. If you see unverified app on the screen when testing your application, you must submit a verification request to remove it. Find out more about unverified apps and get answers to frequently asked questions about app verification in the Help Center.


Solution:
I was using the same API credentials in both development and staging so Google wouldn't let me create a sign in on the same app (in it's eyes) from two locations.



5173 ba galiyay kas inu development yhy u mlyna
client id: 1008204425496-b9tlefjs2b6o4abm8p0gkp1kq9ll3kif.apps.googleusercontent.com


clietn secret: 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


//kii hore 5000 ba geeyay wa production u malyna





both of them i will give same redirect url right so know i was using enviromen or developemnt one i created and used it's the one with github name that is where the error is coming from so my code was this require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET
const GITHUB_CLIENT_ID_GA = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRETS

passport.use(
    new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    done(null,profile );
  }
  )
);
passport.use(
    new GithubStrategy(
  {
    clientID: GITHUB_CLIENT_ID_GA,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    done(null,profile );
  }
  )
);


passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
}); i created another credentials with diffrent github_cleint_id and github secret know what do i do with it becouse these befoe i was using it how about these ones 