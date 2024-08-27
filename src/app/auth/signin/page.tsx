import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { searchParamsLoginTypes } from "./_types/searchParamsLoginTypes";
import Login from "./_components/Login";

function SignIn({
	searchParams,
}: {
	searchParams: searchParamsLoginTypes;
}) {
	return (
		<div className="flex justify-center items-center h-screen">
			<Card>
				<CardBody>
					<Login searchParams={searchParams} />
				</CardBody>
			</Card>
		</div>
	);
}

export default SignIn;
