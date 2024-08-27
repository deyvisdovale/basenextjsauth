"use client";
import { Input } from "@nextui-org/react";
import { z } from "zod";
import { searchParamsLoginTypes } from "../_types/searchParamsLoginTypes";
import { loginAction } from "../_actions/loginAction";
import { useFormState } from "react-dom";
import BtnLogin from "./BtnLogin";
import Image from "next/image";
import InputPassword from "@/components/InputPassword/InputPassword";

const FormSchema = z.object({
	email: z.string().email({
		message: "Por favor, insira um endereço de e-mail válido",
	}),
	password: z.string().min(8, {
		message: "Senha deve ter no mínimo 8 caracteres",
	}),
});

export default function Login({
	searchParams,
}: {
	searchParams: searchParamsLoginTypes;
}) {
	const [state, action] = useFormState(loginAction, null);
	return (
		<form
			action={action}
			className="w-72 h-96 p-4 flex flex-col gap-2 justify-between overflow-hidden"
		>
			<div>{/* <Image src={} alt="Logo" /> */}</div>
			<div className="flex flex-col gap-1">
				<Input
					name="email"
					type="email"
					label="E-mail"
					className="max-w-xs"
					size="sm"
					labelPlacement="outside"
					isInvalid={!!searchParams.email}
					errorMessage={searchParams.email || ""}
				/>
				<InputPassword
					name="password"
					isInvalid={!!searchParams.password}
					errorMessage={searchParams.password || ""}
				/>

				{searchParams.error && (
					<span className="text-danger-400 text-xs pl-1">
						E-mail ou senha errados!
					</span>
				)}
			</div>
			<BtnLogin />
		</form>
	);
}
