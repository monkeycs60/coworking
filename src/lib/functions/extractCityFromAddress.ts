export function extractCityFromAdrAddress(adrAddress: string): string | null {
	const localityPattern = /<span class="locality">(.*?)<\/span>/;
	const match = adrAddress.match(localityPattern);

	return match ? match[1] : null;
}
