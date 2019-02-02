import { IndexPage } from "../pages/renderApp"
import * as IndexedDB from "../modules/indexeddb"
/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
import { roundToTwoDecimals } from "../modules/globalFunctions"
import { loadCategoryData } from "./renderCategories"
import deleteIcon from "../../images/delete.svg"
import {
	validateCategoriesFormData,
	hasDuplicates
} from "./globalValidationFunctions"

export function renderEditCategories() {
	let data = loadCategoryData()
	data
		.then(allCategories => {
			if (allCategories.length > 0) {
				let categoryList = document.querySelector(".js-categories-article")
				categoryList.innerHTML = ""
				let editButton = document.querySelector(".main__child2__categories__headlineIcon__link")
				editButton.style.display = "none"

				allCategories.forEach(category => {
					category.budget = roundToTwoDecimals(category.budget)
					categoryList.appendChild(
						<li class="main__child2__categories__article__ul__li">
							<div class="main__child2__categories__article__ul__li__div">
								<label
									class="main__child2__categories__article__ul__li__label"
									for="catName"
								>
                  Category name:
								</label>
								<input
									id="catName"
									type="text"
									class="main__child2__categories__article__ul__li__input--first"
									value={category.name}
									maxlength="14"
									required
								/>
							</div>
							<div class="main__child2__categories__article__ul__li__div">
								<label
									class="main__child2__categories__article__ul__li__label"
									for="catBudget"
								>
                  Budget:
								</label>
								<input
									id="catBudget"
									type="text"
									class="main__child2__categories__article__ul__li__input--last"
									value={category.budget}
									maxlength="8"
									required
								/>
							</div>
							<input type="hidden" id="catSpent" value={category.spent} />
							<input
								type="hidden"
								id="catRemaining"
								value={category.remaining}
							/>
							<input type="hidden" id="catBudgetOld" value={category.budget} />
							<button class="headlineIcon__link js-deletecategory">
								<img
									class="headlineIcon__link__img "
									src={deleteIcon}
									alt="Delete category."
								/>
							</button>
						</li>
					)
				})

				let deleteButtons = document.querySelectorAll(".js-deletecategory")
				deleteButtons.forEach(button => {
					button.addEventListener("click", deleteCategory)
				})
				let accountsArticle = document.querySelector(".js-categories-article") 
				accountsArticle.appendChild(
					<div>
						<button class="js-editCategories__button__cancel button">Cancel</button>
						<button class="js-editCategories__button__save button">Save</button>
  
					</div>
				)
				let cancelChangesButton = document.querySelector(".js-editCategories__button__cancel")
				cancelChangesButton.addEventListener("click", IndexPage.reloadCategories)
  
				let saveChangesButton = document.querySelector(".js-editCategories__button__save")
				saveChangesButton.addEventListener("click", updateCategories)
			}
		})
		.catch(() => {
			console.log("Something went wrong when loading the edit forms")
		})
}

export function updateCategories() {
	let inputsName = document.querySelectorAll(
		".main__child2__categories__article__ul__li__input--first"
	)
	let inputsBudget = document.querySelectorAll(
		".main__child2__categories__article__ul__li__input--last"
	)
	let inputsSpent = document.querySelectorAll("#catSpent")
	let inputsRemaining = document.querySelectorAll("#catRemaining")
	let inputsBudgetOld = document.querySelectorAll("#catBudgetOld")
	let items = []
	let names = []
	for (let i = 0; i < inputsName.length; i++) {
		items[i] = {
			name: inputsName[i].value,
			budget: inputsBudget[i].value,
			spent: inputsSpent[i].value,
			remaining: inputsRemaining[i].value
		}
		let name = inputsName[i].value
		let budget = inputsBudget[i].value
		names.push(name)
		let errorMsg = validateCategoriesFormData(name, budget)
		if (errorMsg) {
			alert(errorMsg)
			return
		}
		//check for duplicates
		if (hasDuplicates(names)) {
			alert(
				"You have category names with the same name. Change the category names to make them unique!"
			)
			return
		}
		let remaining = parseFloat(inputsRemaining[i].value)
		let budgetOld = parseFloat(inputsBudgetOld[i].value)
		let budgetNew = parseFloat(inputsBudget[i].value)

		if (budgetNew > budgetOld) {
			remaining += budgetNew - budgetOld
		} else if (budgetNew < budgetOld) {
			remaining -= budgetOld - budgetNew
		}
		if (remaining < 0) {
			alert(
				"The budget is too small. Your spent amount already exceeds this budget. Add a higher budget."
			)
			return
		}
		items[i].remaining = remaining
	}

	let deleteComplete = IndexedDB.deleteAllCategories()
	deleteComplete
		.then(() => {
			let result = IndexedDB.addCategories(items)
			result
				.then(() => {
					IndexPage.reloadCategories()
					IndexPage.reloadDiagrams()

					let editCategorybtn = document.querySelector(
						".main__child2__categories__headlineIcon__link"
					)
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

function deleteCategory(e) {
	let deleteBtn = e.currentTarget
	let deleteLi = deleteBtn.parentNode
	deleteLi.parentNode.removeChild(deleteLi)
}
