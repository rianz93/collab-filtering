export function numerator(input, alternatif) {
	let result = 0;
	for (let index in input) {
		if (index != "nama" && index != "id" && index != "email") {
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
		if (index != "nama" && index != "id" && index != "email") {
			sumSq1 += input[index] * input[index];
			sumSq2 += alternatif[index] * alternatif[index];
		}
	}
	result = Math.sqrt(sumSq1 * sumSq2);
	return result;
}

export function getTopN(arr, prop, n) {
	// clone before sorting, to preserve the original array
	let clone = arr.slice(0);

	// sort descending
	clone.sort((x, y) => {
		if (x[prop] == y[prop]) return 0;
		else if (x[prop] < y[prop]) return 1;
		else return -1;
	});

	return clone.slice(0, n || 1);
}

export function getPercentage(arr, percentage) {
	console.log(arr)
	let testing = [];
	let training = arr.slice(0);

	let index = 0;
	let percentageTesting = parseInt((arr.length - 1) * (percentage / 100));

	while (index <= percentageTesting) {
		let slicer = parseInt(Math.random() * training.length);
		let removed = training.splice(slicer, 1);

		testing.push(removed[0]);
		index++;
	}

	let prepared = {
		training: training,
		testing: testing,
	};
	return prepared;
	// let p =0;
	// for(let i in training){
	// 	for(let k in testing){
	// 		if(testing[k] == training[i]){
	// 			p++
	// 		}
	// 	}
	// }
	// console.log(p);
	// JUST CHECKING IF THERE REDUNDANT DATA IN TESTING AND TRAINING
}
