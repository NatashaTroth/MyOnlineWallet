import * as IndexedDB from "../modules/indexeddb"
import { addCategoriesToIncomeOutgoingForm } from "./addIncomeOutgoing"
/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
import {
	roundToTwoDecimals,
	convertCurrencyToString,
	calculatePercentSpent
} from "../modules/globalFunctions"
import { updateCategories, renderEditCategories } from "./renderEditCategories"
import editIcon from "../../images/edit.svg"

export function loadCategoryData() {
	let dbPromise = IndexedDB.setUpDB()
	return dbPromise.then(db => {
		let categories = IndexedDB.getCategories(db)
		return categories
	})
}

export function renderCategories(allCategories) {
	let categoryBlock = document.querySelector(".js-categories-article")
	categoryBlock.innerHTML = ""
	let editButton = document.querySelector(".main__child2__categories__headlineIcon__link")
	editButton.style.display = "initial"
	if (allCategories.length <= 0) {
		categoryBlock.appendChild(<p>No categories have been added yet.</p>)
		addCategoriesToIncomeOutgoingForm(allCategories)

	} else {
		let counter = 0
		allCategories.forEach(category => {
			category.budget = roundToTwoDecimals(category.budget)
			category.spent = roundToTwoDecimals(category.spent)
			category.remaining = roundToTwoDecimals(category.remaining)

			let spentPercent = calculatePercentSpent(
				parseFloat(category.spent),
				parseFloat(category.remaining)
			)
			categoryBlock.appendChild(
				<article class={"main__child2__categories__" + counter}>
					<h3 class="main__child2__categories__h3">{category.name}</h3>
					<div class="main__child2__categories__labels">
						<p>Spent: {convertCurrencyToString(category.spent)}</p>
						<p>Remaining: {convertCurrencyToString(category.remaining)}</p>
					</div>

					<div class="main__child2__categories__js-progressbar--back">
						<div class="main__child2__categories__js-progressbar--front">
							<span class="main__child2__categories__js-progressbar__text--remaining" />
						</div>
					</div>
				</article>
			)

			let className =
        ".main__child2__categories__" +
        counter +
        " .main__child2__categories__js-progressbar--front"
			let progressbar = document.querySelector(className)
			progressbar.style.width = spentPercent + "%"
			counter++
		})
		//change back to edit button
		let editButton = document.querySelector(".js-categories-edit-icon")

		editButton.src = editIcon
		editButton.alt = "Circle with a pencil icon inside."
		let editCategorybtn = document.querySelector(
			".main__child2__categories__headlineIcon__link"
		)
		editCategorybtn.removeEventListener("click", updateCategories)
		editCategorybtn.addEventListener("click", renderEditCategories)

		addCategoriesToIncomeOutgoingForm(allCategories)
	}
}
