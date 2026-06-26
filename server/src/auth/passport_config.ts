import passport from "passport";
import jwt from "./strategies/jwt";
import local from "./strategies/local";

passport.use(jwt);
passport.use(local);

export default passport;
