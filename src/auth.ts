import NextAuth, {
	AuthError,
	CredentialsSignin,
	DefaultSession,
} from "next-auth";
import { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 */
	interface User {
		name?: string | null;
		role?: "DEVELOPER" | "MANAGEMENT" | "USER";
		permissions?: string[];
		userName?: string;
		accessToken?: string;
		inReset?: boolean;
	}
	/**
	 * Returned by `useSession`, `auth`, contains information about the active session.
	 */
	interface Session {
		user: User & DefaultSession["user"];
	}
}

const providers: Provider[] = [
	Credentials({
		credentials: {
			email: {},
			password: {},
		},
		authorize: async (credentials) => {
			console.log("### - Auth Authorize - ###");
			console.log(credentials);
			const user = {
				id: "1",
				name: "Deyvis",
				role: "DEVELOPER" as const, // Ensure role is typed correctly
				permissions: [],
				userName: "deyvis",
				accessToken: "tetetete",
				inReset: false,
			};
			if (!user) {
				console.log("Error Auth");
				console.log("### - Auth Authorize - ###");
				throw new AuthError("User not found.");
			}
			console.log("### - Auth Authorize - ###");
			return user;
		},
	}),
];

export const providerMap = providers.map((provider) => {
	if (typeof provider === "function") {
		const providerData = provider();
		return { id: providerData.id, name: providerData.name };
	} else {
		return { id: provider.id, name: provider.name };
	}
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers,
	pages: {
		signIn: "/auth/signin",
		error: "/auth/signin",
	},
	callbacks: {
		session({ session, token, user }) {
			// `session.user.address` is now a valid property, and will be type-checked
			// in places like `useSession().data.user` or `auth().user`
			return {
				...session,
				user: {
					...session.user,
					...user,
				},
			};
		},
	},
});
