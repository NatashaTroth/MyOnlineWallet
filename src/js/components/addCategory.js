import { IndexPage } from "../pages/renderApp"
import * as IndexedDB from "../modules/indexeddb"
import {
	validateDatabase,
	validateCategoriesFormData
} from "./globalValidationFunctions"

export function addCategory(event) {
	event.preventDefault()
	let name = document.querySelector(".js-add-category .js-name").value
	let budget = document.querySelector(".js-add-category .js-budget").value

	//Validations & add to database
	let errorMsg = validateCategoriesFormData(name, budget)
	if (errorMsg) {
		alert(errorMsg)
		return
	}

	let complete = validateDatabase(name, "categories", 9)
	complete
		.then(result => {
			if (!result) throw "Error!" // You already have 9 categories. This is the maximum amount! Delete a category to add a new one."
		})
		.then(() => {
			let item = { name: name, budget: budget }
			let result = IndexedDB.addToDb("categories", item)
			result
				.then(() => {
					//empty category input fields
					document.querySelector(".js-add-category .js-name").value = ""
					document.querySelector(".js-add-category .js-budget").value = ""
					IndexPage.reloadCategories()
					IndexPage.reloadDiagrams()
				})
				.catch(() => {
					console.log("Error! The category could not be added")
				})
		})
		.catch(() => {
			console.log("Error! The database validation failed")
		})
}
