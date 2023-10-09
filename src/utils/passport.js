import passport from 'passport';
import local from 'passport-local';
import fetch from 'node-fetch'
import { isValidPassword } from './bcrypt.js';
import { UserModel } from '../DAO/mongo/models/users.model.js';
import GitHubStrategy from 'passport-github2';
import { entorno } from '../dirname.js';
import { users } from '../DAO/factory.js';
import { usersService } from '../services/users.service.js';
import { logger } from './logger.js';
const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await users.findUserByEmail(username);
        if (!user) {
          logger.warn('User Not Found with username (email) ' + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          logger.warn('Invalid Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { firstName, lastName, age } = req.body;
          let user = await users.findUserByEmail(username);

          if (user) {
            logger.info('User already exists');
            return done(null, false);
          }

          const newUser = {
            email: username,
            firstName,
            lastName,
            age,
            password,
          };

          let userCreated = await usersService.registerNewUser(newUser);

          logger.info('User Registration succesfull');
          return done(null, userCreated);
        } catch (e) {
          logger.error('Error in register');
          logger.error(e);
          return done(e);
        }
      }
    )
  );

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: entorno.GITHUB_PASSPORT_CLIENT_ID,
        clientSecret: entorno.GITHUB_PASSPORT_CLIENT_SECRET,
        callbackURL: entorno.GITHUB_PASSPORT_CALLBACK_URL,
      },
      async (accesToken, _, profile, done) => {
        try {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error('cannot get a valid email for this user'));
          }
          profile.email = emailDetail.email;

          let user = await UserModel.findOne({ email: profile.email });
          if (!user) {

            const newUser = {
              email: profile.email,
              password: 'nopass',
              firstName: profile._json.name || profile._json.login || 'noname',
              lastName: 'nolast',
              age: profile.age || 18,
            };

            let userCreated = await usersService.registerNewUser(newUser);
            logger.info('User Registration succesfull');
            return done(null, userCreated);
          } else {
            logger.info('User already exists');
            return done(null, user);
          }
        } catch (e) {
          logger.error('Error en auth github');
          logger.error(e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}
