import clientPromise from "@/library/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        // Removed 'name' field from login flow; kept in authorize for future use
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("phones_store");

        // Try to find existing user
        let user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) {
          // If user doesn't exist, throw error (we do NOT auto-create user on login)
          throw new Error("No user found. Please register first.");
        } else {
          // Existing user → check password
          if (credentials.password !== user.password) {
            throw new Error("Invalid password");
          }
        }

        // Return user object (image can be added in the future)
        return { id: user._id.toString(), name: user.name, email: user.email, image: user.image || null };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" } // redirect to login page
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
