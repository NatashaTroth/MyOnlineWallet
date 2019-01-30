import { IndexPage } from "../pages/renderApp"
import { h } from "jsx-dom"
import * as IndexedDB from "../modules/indexeddb"
import {validateDatabase, validateAccountsFormData}from "./globalFunctions"

export function addAccount(event) {
	event.preventDefault(event)
	console.log("add accounts button")
	let name = document.querySelector(".js-add-account .js-name").value
	let amount = document.querySelector(".js-add-account .js-amount").value
	let errorMsg = validateAccountsFormData(name, amount)
	if (errorMsg) {
		alert(errorMsg)
		return
	}
    
	let complete = validateDatabase(name, "accounts", 6)
	complete
		.then(result => {
			console.log("result: " + result)
			if (!result) throw "Error!"
		})
		.then(() => {
			let item = { name: name, amount: amount }
			let result = IndexedDB.addToDb("accounts", item)
			result
				.then(() => {
					console.log("Account was successfully added")
					IndexPage.reloadAccounts()
				})
				.catch(()=> {
					console.log("Error! The account could not be added")
				})
		})
		.catch(() => {
			console.log("Error! The database validation failed")
		})
}

 