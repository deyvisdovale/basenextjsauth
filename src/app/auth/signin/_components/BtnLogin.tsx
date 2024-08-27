import { Button } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

export default function BtnLogin() {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" color="primary" isLoading={pending}>
			Entrar
		</Button>
	);
}
