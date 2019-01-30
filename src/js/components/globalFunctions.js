
import { h } from "jsx-dom"
import {loadCategoryData} from "./renderCategories"
import {loadAccountData} from "../components/renderAccounts"


export function validateDatabase(name, objectStore, limit, update = false) {
	console.log("IN VALIDATIONS")
	//check database
	let request
	switch (objectStore) {
	case "accounts":
		request = loadAccountData()
		break
	case "categories":
		request = loadCategoryData()
		break
	}
	return request
		.then(allObjects => {
			//check length
			if (allObjects.length >= limit) {
				throw `Error! You already have ${limit} ${objectStore}. This is the maximum amount!`
			}

			//check for duplicate name
			let countDuplicates = 0
			console.log("WHYY " + allObjects.length)

			allObjects.forEach(object => {

				console.log(countDuplicates + " COUNTER")
				//if category name already exists
				if (object.name == name && !update || object.name == name && countDuplicates > 1) {
					switch (objectStore) {
					case "accounts":
						throw "Error! This account already exists"
					case "categories":
						throw "Error! This category already exists"
					}
				}
				else if(object.name == name && update)  //can have already have one saved with the same name
					countDuplicates++
			})
		})
		.then(() => {
			//if validation passed (didn't go to catch)
			return true
		})
		.catch(resp => {
			alert(resp)
			return false
		})
}

export function validateAccountsFormData(name, number) {
	let errorMsg = ""
	if (name == null || name.length == 0)
		errorMsg += "You must enter a name.\n"
	if(name.length > 14)
		errorMsg += "The name cannot be longer than 14 characters.\n"
	if (number == null || number == "")
		errorMsg += "You must enter an amount.\n"
	if (isNaN(number)) errorMsg += "The amount must be a number."
	else if(parseFloat(number) < 0) errorMsg += "The amount must be a positive number.\n"
	else if(number.length > 8)
	errorMsg += "The number cannot be longer than 8 digits.\n"
	if (errorMsg) return `Error! ${errorMsg}`
}