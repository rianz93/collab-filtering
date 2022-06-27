export function numerator(input, alternatif) {
	let result = 0;
	for (let index in input) {
		if (index != "nama" && index != "id") {
			result += input[index] * alternatif[index];
		}
	}
	// console.log(result);
}

export function denominator(input, alternatif) {
	let result = 0;
	let sqrtResult1 = 0;
	let sqrtResult2 = 0;
	for (let index in input) {
		if (index != "nama" && index != "id") {
			sumSq1 += input[index] * input[index];
			sumSq2 += alternatif[index] * alternatif[index];
		}
		result = sumSq1 * sumSq2;
	}
	console.log(Math.sqrt(result));
}
