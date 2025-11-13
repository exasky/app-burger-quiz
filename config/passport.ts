import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../app/models/user';

export function passportConfig(passport: PassportStatic) {
    // =========================================================================
    // passport session setup
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser((user: any, done: any) => {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser((user: any, done: any) => {
        done(null, user);
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(new LocalStrategy({
        passReqToCallback: true
    },
        (req: any, username: string, password: string, done: any) => {
            if (username.toLowerCase() === 'admin' && password === 'burger2018') {
                const user = new User();
                user.username = username;
                user.password = password;
                user.title = 'admin';
                done(null, user);
            } else {
                done(null, false);
            }
        }
    ));
};
