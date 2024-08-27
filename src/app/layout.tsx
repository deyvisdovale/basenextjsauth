import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/global/Providers";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sistema Comercial",
	description: "Sistema Comercial",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ptBR" className="dark">
			<body className={`${nunito.className} h-screen w-screen`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
