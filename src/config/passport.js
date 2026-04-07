import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./prisma.js"; // pakai ini saja (hapus PrismaClient manual)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("PROFILE:", profile);

        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Email tidak ditemukan dari Google"), null);
        }

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName || "No Name",
              email,
              password: "",
            },
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("GOOGLE AUTH ERROR:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;