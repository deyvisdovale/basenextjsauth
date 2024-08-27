export function formatTimestamp(timestamp: string) {
	const date = new Date(timestamp);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

export function formatLocaldate(timestamp: string) {
	const [year, month, day] = timestamp.split("-");
	return `${day}/${month}/${year}`;
}
