import passport from "../auth/passport_config";

const verifyToken = passport.authenticate("jwt", { session: false });

export default verifyToken;
