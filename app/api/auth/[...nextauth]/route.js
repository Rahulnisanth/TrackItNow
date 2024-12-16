import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connect_to_database } from "@/lib/mongoose";
import People from "@/lib/models/people.model";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No email fetched from Google profile");
      }
      try {
        await connect_to_database();
        let people = await People.findOne({ email: profile.email });
        if (!people) {
          people = new People({
            name: profile.name,
            email: profile.email,
            favoriteProducts: [],
            trackedProducts: [],
          });
          await people.save();
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async session({ session, token }) {
      if (session.people?.email) {
        try {
          await connect_to_database();
          const people = await People.findOne({ email: session.people.email });
          session.people.id = people?._id;
        } catch (error) {
          console.error("Error in session callback:", error);
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
