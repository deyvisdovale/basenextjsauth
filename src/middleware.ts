import { auth } from "@/auth";

export default auth((req) => {
	console.log("### - Middleware Auth - ###");
	// console.log(req.auth);
	// console.log(req.nextUrl.pathname);
	// console.log(req.nextUrl);
	// console.log(req.nextUrl.pathname.startsWith("/auth/signin"));

	if (!req.auth && !req.nextUrl.pathname.startsWith("/auth/signin")) {
		const newUrl = new URL(`/auth/signin`, req.nextUrl.origin);
		return Response.redirect(newUrl);
	}

	if (req.auth && req.nextUrl.pathname.startsWith("/auth/signin")) {
		const newUrl = new URL(`/pages/home`, req.nextUrl.origin);
		return Response.redirect(newUrl);
	}
	console.log("### - Middleware Auth Finish - ###");
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
