import { IndexPage } from "../pages/renderApp"
import { h } from "jsx-dom"
import * as IndexedDB from "../modules/indexeddb"
import {roundToTwoDecimals}from "../modules/globalFunctions"

export function addIncomeOutgoing(event) {
	event.preventDefault()
	console.log("add income/outgoing button")

	let amount = document.querySelector(".js-add-income-outgoing .js-amount")
		.value
	let category = document.querySelector(
		".js-add-income-outgoing .js-category"
	).value
	let account = document.querySelector(".js-add-income-outgoing .js-account")
		.value
	let type = document.querySelector(".js-add-income-outgoing .js-type").value

    
	let errorMsg = validateIncomingOutgoingFormData(
		amount,
		category,
		account,
		type
	)
	if (errorMsg) {
		alert(errorMsg)
		return
	}

	let complete = validateIncomingOutgoingDatabase(parseFloat(amount), category, account, type)
	complete
		.then(result => {
			console.log("result: " + result)
			if (!result) throw "Error!"
		})
		.then(() => {
			let item = {
				amount: amount,
				category: category,
				account: account,
				type: type
			}
			let result = IndexedDB.addToDb("incomeOutgoing", item)
			result
				.then(() => {
					console.log(`${item.type} was successfully added`)
					IndexPage.reloadAccounts()
					IndexPage.reloadCategories()
					IndexPage.reloadDiagrams()
				})
				.catch(() => {
					console.log(`Error! The ${item.type} could not be added`)
				})

		})
		.catch(() => {
			console.log("Error! The database validation failed")
		})

   
}

function validateIncomingOutgoingFormData(amount, category, account, type) {
	let errorMsg = ""
	//amount
	if (amount == null || amount == "")
		errorMsg += "You must enter an amount.\n"
	if (isNaN(amount)) errorMsg += "The amount must be a number.\n"
	else if(parseFloat(amount) < 0) errorMsg += "The amount must be a positive number.\n"
	//category
	if (category == null || category.length == 0)
		errorMsg += "You must enter a category.\n"
	//account
	if (account == null || account.length == 0)
		errorMsg += "You must enter an account.\n"
	//type
	if (type == null || type.length == 0)
		errorMsg += "You must enter a type.\n"
	if (errorMsg) return `Error! ${errorMsg}`
}

function validateIncomingOutgoingDatabase(amount, categoryName, accountName, type){
	// //account - account can't go in minus
	// let accountFromDBResult = IndexedDB.getAccount(accountName);
	// //ONLY IF OUTGOING !!!!!
	// accountFromDBResult.then((accountFromDB) => {
	//   //if(accountName == accountFromDB.name) //extra check
	//   if(accountFromDB.amount - amount <= 0)
	//     throw "This am"

	// })
	// .catch((resp) => {
	//   console.log("Error! Could not get that account!")
	//   alert(resp)
	//   return false
	// })

	//category
	let categoryFromDBResult = IndexedDB.getCategory(categoryName)
	return categoryFromDBResult.then((categoryFromDB) => {
		if(type == "outgoing"){
			console.log(roundToTwoDecimals(categoryFromDB.budget) + " BUDGET " + (categoryFromDB.spent + amount))
			if((parseFloat(categoryFromDB.spent) + parseFloat(amount)) > roundToTwoDecimals(categoryFromDB.budget)){
				throw "This outgoing exceeds your budget!"
			}
		}
		else if(type == "income"){
			if(categoryFromDB.remaining + amount > roundToTwoDecimals(categoryFromDB.budget))
				throw "This income is too high. The remaining money in this category is higher than the budget!"
        + "\nChange the budget to add this income, or add the income directly to the accounts (without adding it to a specific category)."
		}
	})
		.then(() => {
			return true
		})
		.catch((resp) => {
			alert(resp)
			return false
		})
}



export function addCategoriesToIncomeOutgoingForm(categories) {
	let categorySelect = document.querySelector(
		".js-add-income-outgoing .js-category"
	)
	addOptionsToSelect(categorySelect, categories)
}

export function addAccountsToIncomeOutgoingForm(accounts) {
	let accountSelect = document.querySelector(
		".js-add-income-outgoing .js-account"
	)
	addOptionsToSelect(accountSelect, accounts)
}

function addOptionsToSelect(selectNode, options) {
	//delete all current options
	while (selectNode.length > 0) {
		selectNode.remove(0)
	}

	//add all current options
	options.forEach(value => {
		let option = document.createElement("option")
		option.value = value.name //.toLowerCase();
		option.innerHTML = value.name
		selectNode.appendChild(option)
	})
}
