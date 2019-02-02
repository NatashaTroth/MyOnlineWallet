export function roundToTwoDecimals(number) {
	return Math.round(number * 100) / 100
}

export function convertCurrencyToString(number) {
	if (number == "0" || number == 0) return "0.00€"
	number *= 100 //2290
	number = roundToTwoDecimals(number) //22.9
	let numberString = number.toString()

	return `${numberString.substring(
		0,
		numberString.length - 2
	)}.${numberString.substring(numberString.length - 2, numberString.length)}€`
}

export function calculatePercentSpent(spent, remaining) {
	return roundToTwoDecimals((100 / (remaining + spent)) * spent)
}
