async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("PROFILE:", profile); // DEBUG

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