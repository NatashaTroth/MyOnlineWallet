import { IndexPage } from "../pages/renderApp"
import * as IndexedDB from "../modules/indexeddb"
/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
import { roundToTwoDecimals } from "../modules/globalFunctions"
import { loadAccountData } from "./renderAccounts"
import deleteIcon from "../../images/delete.svg"
import {
	validateAccountsFormData,
	hasDuplicates
} from "./globalValidationFunctions"

export function renderEditAccounts() {
	let data = loadAccountData()
	data
		.then(allAccounts => {
			if (allAccounts.length > 0) {
				let accountList = document.querySelector(".js-listOfAccounts")
				accountList.innerHTML = ""
				let editButton = document.querySelector(".main__child2__headlineIcon__link")
				editButton.style.display = "none"

				allAccounts.forEach(account => {
					account.amount = roundToTwoDecimals(account.amount)
					accountList.appendChild(
						<li class="main__child2__accounts__article__ul__li">
							<div class="main__child2__accounts__article__ul__li__div">
								<label
									class="main__child2__accounts__article__ul__li__label"
									for="accName"
								>
                  Category name:
								</label>
								<input
									type="text"
									id="accName"
									class="main__child2__accounts__article__ul__li__input--first"
									value={account.name}
									maxlength="14"
									required
								/>
							</div>
							<div class="main__child2__accounts__article__ul__li__div">
								<label
									class="main__child2__accounts__article__ul__li__label"
									for="accAmount"
								>
                  Amount:
								</label>
								<input
									type="text"
									id="accAmount"
									class="main__child2__accounts__article__ul__li__input--last"
									value={account.amount}
									maxlength="8"
									required
								/>
							</div>
							<button class="headlineIcon__link js-deleteaccount">
								<img
									class="headlineIcon__link__img "
									src={deleteIcon}
									alt="Delete account."
								/>
							</button>
						</li>
					)
				})
    

				let deleteButtons = document.querySelectorAll(".js-deleteaccount")
				deleteButtons.forEach(button => {
					button.addEventListener("click", deleteAccount)
				})
				let accountsArticle = document.querySelector(".js-accounts-article") 
				accountsArticle.appendChild(
					<div>
						<button class="js-editAccounts__button__cancel button">Cancel</button>
						<button class="js-editAccounts__button__save button">Save</button>

					</div>
				)
				let cancelChangesButton = document.querySelector(".js-editAccounts__button__cancel")
				cancelChangesButton.addEventListener("click", IndexPage.reloadAccounts)

				let saveChangesButton = document.querySelector(".js-editAccounts__button__save")
				saveChangesButton.addEventListener("click", updateAccounts)
			}
      
		})
		.catch(() => {
			console.log("Something went wrong when loading the edit forms")
		})
}

function deleteAccount(e) {
	let deleteBtn = e.currentTarget
	let deleteLi = deleteBtn.parentNode
	deleteLi.parentNode.removeChild(deleteLi)


}

export function updateAccounts() {
	let inputsName = document.querySelectorAll(
		".main__child2__accounts__article__ul__li__input--first"
	)
	let inputsAmount = document.querySelectorAll(
		".main__child2__accounts__article__ul__li__input--last"
	)
	let items = []
	let names = []
	for (let i = 0; i < inputsName.length; i++) {
		items[i] = { name: inputsName[i].value, amount: inputsAmount[i].value }
		let name = inputsName[i].value
		let amount = inputsAmount[i].value
		names.push(name)

		//validations
		let errorMsg = validateAccountsFormData(name, amount)
		if (errorMsg) {
			alert(errorMsg)
			return
		}
	}

	//check for duplicates
	if (hasDuplicates(names)) {
		alert(
			"You have account names with the same name. Change the account names to make them unique!"
		)
		return
	}

	let deleteComplete = IndexedDB.deleteAllAcounts()
	deleteComplete
		.then(() => {
			let result = IndexedDB.addAccounts(items)
			result
				.then(() => {
					IndexPage.reloadAccounts()
					//change back to edit button
					let editButton = document.querySelector(".js-accounts-edit-Icon")
					editButton.style.display = "initial"
					// let editButton = document.querySelector(".js-accounts-edit-Icon")
					// editButton.src = editIcon
					// editButton.alt = "Edit accounts."
					// let editAccountbtn = document.querySelector(
					//   ".main__child2__headlineIcon__link"
					// )
					// editAccountbtn.removeEventListener("click", updateAccounts)
					// editAccountbtn.addEventListener("click", renderEditAccounts)
				})
				.catch(() => {
					console.log(" Items not added")
				})
		})
		.catch(() => {
			console.log("The accounts could not be updated")
		})
}
