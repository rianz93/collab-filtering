export function numerator(input, alternatif) {
	let result = 0;
	for (let index in input) {
		if (index != "nama" && index != "id") {
			result += input[index] * alternatif[index];
		}
	}
	return result;
}

export function denominator(input, alternatif) {
	let result = 0;
	let sumSq1 = 0;
	let sumSq2 = 0;
	for (let index in input) {
		if (index != "nama" && index != "id") {
			sumSq1 += input[index] * input[index];
			sumSq2 += alternatif[index]*alternatif[index]; 
		}
	
	}
	result = Math.sqrt(sumSq1*sumSq2);
	return result;
}
