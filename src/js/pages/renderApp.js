import { h } from "jsx-dom"
import * as IndexedDB from "../modules/indexeddb"
import { loadAccountData, renderAccounts } from "../components/renderAccounts"
import {
	loadCategoryData,
	renderCategories
} from "../components/renderCategories"
import { addIncomeOutgoing } from "../components/addIncomeOutgoing"
import { addAccount } from "../components/addAccount"
import { addCategory } from "../components/addCategory"

import { renderDiagramAllCats } from "./diagrams/renderAllCatsDiagram"
import { renderDiagramSingleCat } from "./diagrams/renderSingleCatDiagram"
import { renderDiagramBudgets } from "./diagrams/renderBudgetsDiagram"
import { renderEditAccounts } from "../components/renderEditAccounts"

export class IndexPage {
	constructor() {
		this.init()
		this.listen()
	}

	listen() {
		//edit accounts
		let editAccountbtn = document.querySelector(".main__child2__headlineIcon__link")
		editAccountbtn.addEventListener("click", renderEditAccounts)

		//addIncome/Outgoing
		let addIncomeOutgoingBtn = document.querySelector(
			".js-income-outgoing-submit-btn"
		)
		addIncomeOutgoingBtn.addEventListener("click", addIncomeOutgoing)

		//addAccounts
		let addAccountBtn = document.querySelector(".js-accounts-submit-btn")
		addAccountBtn.addEventListener("click", addAccount)

		//addCategory
		let addCategoryBtn = document.querySelector(".js-categories-submit-btn")
		addCategoryBtn.addEventListener("click", addCategory)

		let diagram_tabs = document.getElementsByClassName(
			"diagrams__nav__ul__listItem__link"
		)
		for (let i = 0; i < diagram_tabs.length; i++) {
			diagram_tabs[i].addEventListener("click", this.changeDiagramTab)
		}
	}

	init() {
		IndexedDB.setUpDB()
		console.log(window.location.pathname + "  PATHDB")
		let requestAccounts = loadAccountData()
		requestAccounts
			.then(allAccounts => renderAccounts(allAccounts))
			.catch(() => {
				console.log("Error! Couldn't render accounts")
			})

		let requestCategories = loadCategoryData()
		requestCategories.then(allCategories => renderCategories(allCategories))
	}



	static reloadAccounts() {
		console.log("reload accounts")
		let requestAccounts = loadAccountData()
		requestAccounts.then(allAccounts => renderAccounts(allAccounts))
	}

	static reloadCategories() {
		console.log("reload categories")
		let requestCategories = loadCategoryData()
		requestCategories.then(allCategories => renderCategories(allCategories))
	}

	static reloadDiagrams() {
		console.log(window.location.pathname + "  PATH")
		switch (window.location.pathname) {
		case "/":
			renderDiagramAllCats()
			break
		case "single-category":
		case "/single-category":
			renderDiagramSingleCat()
			break
		case "budgets":
		case "/budgets":
			renderDiagramBudgets()
			break
		}
	}

	//..........ONCLICK..........
	changeDiagramTab(event) {
		event.preventDefault()
		switch (event.target.innerHTML) {
		case "All categories":
			// RenderPage.renderDiagramAllCats();
			history.pushState({ page: 1 }, "", "/")
			break
		case "Single categories":
			history.pushState({ page: 1 }, "", "single-category")
			break
		case "Budgets":
			history.pushState({ page: 1 }, "", "budgets")
			break
		case "Tips":
			history.pushState({ page: 1 }, "", "tips")
			break
		}
	}
  
	// renderEditAccounts(){
	//   history.pushState({ page: 1 }, "", "edit-accounts");
	// }

}
