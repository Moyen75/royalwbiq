import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        Credentials({
            // The name to display on the sign-in form (e.g., 'Sign in with...')
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // Add your authentication logic here.
                // For example, check against a database and return user data if valid,
                // or throw an error if invalid credentials.
                const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
                if (user) {
                    return Promise.resolve(user);
                } else {
                    return Promise.resolve(null);
                }
            },
        }),
        GoogleProvider({
            clientId: '247051852459-fhqqeurjsdptrihhlq8t55mtfpu96gvt.apps.googleusercontent.com',
            clientSecret: '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',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        // Add other providers here if needed (e.g., Facebook, Twitter, etc.)
    ],
    // Add additional NextAuth.js options here if needed
    callbacks: {
        async signIn({ user, account, profile }) {
            // Handle the sign-in event here
            // You can perform any custom logic if needed
            return true; // Return true to allow the sign-in to proceed
        },
        async redirect({ url, baseUrl }) {
            // This function is called after the user is successfully signed in
            // You can customize the redirect URL here
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async jwt({ token, account, profile }) {
            // This callback is called whenever a JSON Web Token (JWT) is created (on sign-in or sign-up).
            // You can customize the token here by adding additional data to it.

            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id // For example, you can add the user ID to the token.
            }

            return token;
        },
        async session({ session, token, user }) {
            // This callback is called whenever a session is created or updated.
            // You can customize the session object here by adding additional data to it.
            if (user) {
                session.accessToken = token.accessToken
                session.user.id = token.id
            }
            // Here, we add the entire token (including user ID) to the session.

            return session;
        },
    },
};
