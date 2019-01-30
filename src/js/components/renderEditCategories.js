import { IndexPage } from "../pages/renderApp"
import * as IndexedDB from "../modules/indexeddb";
//import {addAccountsToIncomeOutgoingForm} from "./addIncomeOutgoing"
import { h } from "jsx-dom";
import {convertCurrencyToString, roundToTwoDecimals}from "../modules/globalFunctions";
import {loadCategoryData, renderCategories} from "./renderCategories"
import saveIcon from "../../images/save.svg"
import deleteIcon from "../../images/delete.svg"
import editIcon from "../../images/edit.svg"
import {validateDatabase, validateCategoriesFormData}from "./globalValidationFunctions";


//renderEditCategories
export function renderEditCategories() {
	
	console.log("renderEditCategories")

	let data = loadCategoryData();
	data.then((allCategories) => {

		let categoryList = document.querySelector(".js-categories-article");
		categoryList.innerHTML= ""
		let editButton = document.querySelector(".js-categories-edit-icon")
		editButton.src = saveIcon
		editButton.alt="Circle with a check mark icon inside."

		let editCategorybtn = document.querySelector(".main__child2__categories__headlineIcon__link")
		editCategorybtn.removeEventListener("click", renderEditCategories)
		editCategorybtn.addEventListener("click", updateCategories)
	
		allCategories.forEach(category => {
			console.log(category)
		category.budget = roundToTwoDecimals(category.budget);
		categoryList.appendChild(
			<li class="main__child2__categories__article__ul__li">
			<div class="main__child2__categories__article__ul__li__div">
				<label class="main__child2__categories__article__ul__li__label" for="catName">Category name:</label>
				<input id="catName" type="text" class="main__child2__categories__article__ul__li__input--first" value={category.name} maxlength="14" required></input>
			</div>
			<div class="main__child2__categories__article__ul__li__div">
			<label class="main__child2__categories__article__ul__li__label" for="catBudget">Budget:</label>			
				<input id="catBudget" type="text" class="main__child2__categories__article__ul__li__input--last" value={category.budget} maxlength="8" required></input>
			</div>
			<input type="hidden" id="catSpent" value={category.spent}></input>
			<input type="hidden" id="catRemaining" value={category.remaining}></input>
			<input type="hidden" id="catBudgetOld" value={category.budget}></input>
			<a class="headlineIcon__link js-deletecategory"><img class="headlineIcon__link__img " src={deleteIcon} alt="Circle with a bin icon inside."></img></a>

			</li>
		);

		});

		let deleteButtons = document.querySelectorAll(".js-deletecategory")
		deleteButtons.forEach((button) => {
			button.addEventListener("click", deleteCategory)
		})
	})
	.catch(() => {
		console.log("Something went wrong when loading the edit forms")
	})
}

export function updateCategories(){
	let inputsName = document.querySelectorAll(".main__child2__categories__article__ul__li__input--first")
	let inputsBudget = document.querySelectorAll(".main__child2__categories__article__ul__li__input--last")
	let inputsSpent = document.querySelectorAll("#catSpent")
	let inputsRemaining = document.querySelectorAll("#catRemaining")
	let inputsBudgetOld = document.querySelectorAll("#catBudgetOld")


	//let item = {name: inputsName, amount: inputsAmount}
	let items = []
	for(let i = 0; i < inputsName.length; i++){

		items[i] = {name: inputsName[i].value, budget: inputsBudget[i].value, spent: inputsSpent[i].value, remaining: inputsRemaining[i].value}
		let name = inputsName[i].value
			let budget = inputsBudget[i].value
			let errorMsg = validateCategoriesFormData(name, budget);
				if (errorMsg) {
					alert(errorMsg);
					return;
			}
	let remaining = parseFloat(inputsRemaining[i].value)
	let budgetOld = parseFloat(inputsBudgetOld[i].value)
	let budgetNew = parseFloat(inputsBudget[i].value)


	if(budgetNew > budgetOld){
		remaining += budgetNew - budgetOld
	}
	else if (budgetNew < budgetOld){
		remaining -= budgetOld - budgetNew
	}
	if(remaining < 0){
		alert("The budget is too small.");
		return;
	}

	items[i].remaining = remaining;


	}

	let deleteComplete = IndexedDB.deleteAllCategories();
	deleteComplete.then(() => {
	
		let result = IndexedDB.addCategories(items);
		console.log(result + "RESULT")
		result.then(() => {
			
			console.log("All Items added")
			IndexPage.reloadCategories()
			//change back to edit button
			let editButton = document.querySelector(".js-categories-edit-icon")
			editButton.src = editIcon
			editButton.alt="Circle with a pencil icon inside."

			let editCategorybtn = document.querySelector(".main__child2__categories__headlineIcon__link")
			editCategorybtn.removeEventListener("click", updateCategories)
			editCategorybtn.addEventListener("click", renderEditCategories)

		})
		.catch(() => {
			console.log(" Items not added")
		})



	})
	.catch(() => {
		console.log("The categories could not be updated")
	})


}

function deleteCategory(e){
	let deleteBtn = e.target;
	let deleteLi = deleteBtn.parentNode.parentNode;
	deleteLi.parentNode.removeChild(deleteLi);
}

  