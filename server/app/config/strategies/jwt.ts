import * as jwt from 'jwt-simple';

import constants = require('./../constants/constants');
import UserModel from '../../models/user.server.model';

let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

interface myOpts {
  jwtFromRequest?: Object;
  secretOrKey?: Object;
}

module.exports = passport => {
  let opts: myOpts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = constants.secret;

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log('=================================================');
      console.log('JWT... (jwt.ts)');
      console.log('=================================================');

      try {
        UserModel.findOne({ id: jwt_payload.id }).then(user => {
          if (user) {
            console.log(`JWT user... jwt.ts 27 ${JSON.stringify(user)}`);

            done(null, user);
          } else {
            done(null, false, 'User found in token not found');
          }
        });
      } catch (e) {
        console.log(e);
      }
    })
  );
};
