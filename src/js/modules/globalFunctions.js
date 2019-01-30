export function roundToTwoDecimals (number){
	return Math.round(number * 100)/100
}

export function convertCurrencyToString(number){
	
	number = roundToTwoDecimals(number)	//22,9
	number *= 100	//2290
	let numberString = number.toString()

	return `${numberString.substring(0,numberString.length - 2)}.${numberString.substring(numberString.length - 2,numberString.length)}€`
}