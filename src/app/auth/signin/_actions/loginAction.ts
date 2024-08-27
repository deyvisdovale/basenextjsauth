"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { RedirectType, redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
	email: z.string().email({
		message: "Por favor, insira um endereço de e-mail válido",
	}),
	password: z.string().min(8, {
		message: "Senha deve ter no mínimo 8 caracteres",
	}),
});

export const loginAction = async (
	previousState: any,
	formData: FormData
) => {
	// await new Promise((resolve) => setTimeout(resolve, 5000));
	const result = FormSchema.safeParse(Object.fromEntries(formData));
	if (result.error) {
		const errorMessage = result.error.issues
			.map(
				(issue) =>
					`${issue.path[0]}=${encodeURIComponent(issue.message)}`
			)
			.join("&");

		redirect(`signin?${errorMessage}`);
	} else {
		try {
			await signIn("credentials", {
				redirect: false,
				email: result.data.email,
				password: result.data.password,
			});
		} catch (error) {
			console.log("$$$ - Auth Error - $$$");
			if (error instanceof AuthError) {
				redirect(`signin?error=${error.type}`);
			}
			return error;
		}
		redirect(`/pages/home`, RedirectType.push);
	}
};
