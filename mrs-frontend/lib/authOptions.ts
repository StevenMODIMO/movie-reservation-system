import Credentials from "next-auth/providers/credentials";
const API = process.env.BACKEND_API_URL;

export const authOptions = {
  providers: [
    Credentials({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "smodimo@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials) => {
        let user = null;
        if (!credentials?.email || !credentials?.password) {
          throw new Error("All fields are required.")
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const formData = new FormData();
          formData.append("username", email);
          formData.append("password", password);
          const response = await fetch(`${API}/api/users/login`, {
            method: "POST",
            body: formData,
          });
          const json = await response.json();
          if (!response.ok) {
            console.log("JSONError: ", json);
          } else {
            console.log("JSONResponse: ", json);
          }
        } catch (error) {
          console.log(error);
        }

        user = { id: email, email, password };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
