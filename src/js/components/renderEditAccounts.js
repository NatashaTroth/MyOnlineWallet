import { IndexPage } from "../pages/renderApp"
import * as IndexedDB from "../modules/indexeddb";
//import {addAccountsToIncomeOutgoingForm} from "./addIncomeOutgoing"
import { h } from "jsx-dom";
import {convertCurrencyToString, roundToTwoDecimals}from "../modules/globalFunctions";
import {loadAccountData, renderAccounts} from "./renderAccounts"
import saveIcon from "../../images/save.svg"
import deleteIcon from "../../images/delete.svg"
import editIcon from "../../images/edit.svg"
import {validateDatabase, validateAccountsFormData}from "./globalFunctions";


//import { loadAccountData, renderAccounts } from "../components/renderAccounts";



//renderEditAccounts
export function renderEditAccounts() {

	let data = loadAccountData();
	data.then((allAccounts) => {

		let accountList = document.querySelector(".js-listOfAccounts");
		accountList.innerHTML= ""
		let editButton = document.querySelector(".js-accounts-edit-Icon")
		editButton.src = saveIcon
		editButton.alt="Circle with a check mark icon inside."

		let editAccountbtn = document.querySelector(".main__child2__headlineIcon__link")
		editAccountbtn.removeEventListener("click", renderEditAccounts)
		editAccountbtn.addEventListener("click", updateAccounts)
	
		allAccounts.forEach(account => {
			console.log(account)
		account.amount = roundToTwoDecimals(account.amount);
		accountList.appendChild(
			<li class="main__child2__accounts__article__ul__li">
			<input type="text" class="main__child2__accounts__article__ul__li__input--first" value={account.name} maxlength="14" required></input>
			<input type="text" class="main__child2__accounts__article__ul__li__input--last" value={account.amount} maxlength="8" required></input>
			<a class="headlineIcon__link js-deleteaccount"><img class="headlineIcon__link__img " src={deleteIcon} alt="Circle with a bin icon inside."></img></a>
			</li>
		);

		});

		let deleteButtons = document.querySelectorAll(".js-deleteaccount")
		deleteButtons.forEach((button) => {
			button.addEventListener("click", deleteAccount)

		})
		

	})
	.catch(() => {
		console.log("Something went wrong when loading the edit forms")
	})
	console.log("renderEditAccounts")
}

function deleteAccount(e){
	let deleteBtn = e.target;
	let deleteLi = deleteBtn.parentNode.parentNode;
	deleteLi.parentNode.removeChild(deleteLi);
}


export function updateAccounts(){
	let inputsName = document.querySelectorAll(".main__child2__accounts__article__ul__li__input--first")
	let inputsAmount = document.querySelectorAll(".main__child2__accounts__article__ul__li__input--last")
	//let item = {name: inputsName, amount: inputsAmount}
	let items = []
	for(let i = 0; i < inputsName.length; i++){
		items[i] = {name: inputsName[i].value, amount: inputsAmount[i].value}
		let name = inputsName[i].value
			let amount = inputsAmount[i].value
			let errorMsg = validateAccountsFormData(name, amount);
				if (errorMsg) {
				alert(errorMsg);
				return;
			}
	}

	let deleteComplete = IndexedDB.deleteAllAcounts();
	deleteComplete.then(() => {
	
		let result = IndexedDB.addAccounts(items);
		console.log(result + "RESULT")
		result.then(() => {
			console.log("All Items added")
			IndexPage.reloadAccounts()
			//change back to edit button
			let editButton = document.querySelector(".js-accounts-edit-Icon")
			editButton.src = editIcon
			editButton.alt="Circle with a pencil icon inside."

			let editAccountbtn = document.querySelector(".main__child2__headlineIcon__link")
			editAccountbtn.removeEventListener("click", updateAccounts)
			editAccountbtn.addEventListener("click", renderEditAccounts)

		})
		.catch(() => {
			console.log(" Items not added")
		})



	})
	.catch(() => {
		console.log("The accounts could not be updated")
	})


}