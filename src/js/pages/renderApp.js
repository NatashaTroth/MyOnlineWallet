/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
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
import { renderEditCategories } from "../components/renderEditCategories"

export class IndexPage {
  constructor() {
    this.init()
    this.listen()
  }

  listen() {
    //home button header logo
    let logoBtn = document.querySelector(".header__link")
    logoBtn.addEventListener("click", this.renderHome)

    //edit accounts
    let editAccountbtn = document.querySelector(
      ".main__child2__headlineIcon__link"
    )
    editAccountbtn.addEventListener("click", renderEditAccounts)

    //edit accounts
    let editCategorybtn = document.querySelector(
      ".main__child2__categories__headlineIcon__link"
    )
    editCategorybtn.addEventListener("click", renderEditCategories)

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
      "diagrams__nav__ul__listItem__button"
    )
    for (let i = 0; i < diagram_tabs.length; i++) {
      diagram_tabs[i].addEventListener("click", this.changeDiagramTab)
    }

    //imprint button
    let imprintBtn = document.querySelector(".footer__link__imprint")
    imprintBtn.addEventListener("click", this.goToImprint)

    //about button
    let aboutBtn = document.querySelector(".footer__link__about")
    aboutBtn.addEventListener("click", this.goToAbout)
  }

  init() {
    IndexedDB.setUpDB()
    let requestAccounts = loadAccountData()
    requestAccounts
      .then(allAccounts => renderAccounts(allAccounts))
      .catch(() => {
        console.log("Error! Couldn't render accounts")
      })

    let requestCategories = loadCategoryData()
    requestCategories.then(allCategories => renderCategories(allCategories))

    //after imprint and page not found
    this.reloadMain()
  }

  reloadMain() {
    let mainChildren = document.querySelectorAll("main > div, .main__child1 ")
    mainChildren.forEach(child => {
      child.style.display = "block"

      let imprint = document.querySelector(".imprint__article")
      if (imprint) {
        imprint.remove()
      }

      let pageNotFound = document.querySelector(".pageNotFound__article")
      if (pageNotFound) {
        pageNotFound.remove()
      }

      let about = document.querySelector(".about__article")
      if (about) {
        about.remove()
      }
    })
  }

  static reloadAccounts() {
    let requestAccounts = loadAccountData()
    requestAccounts.then(allAccounts => renderAccounts(allAccounts))
  }

  static reloadCategories() {
    let requestCategories = loadCategoryData()
    requestCategories.then(allCategories => renderCategories(allCategories))
  }

  static reloadDiagrams() {
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
  renderHome(event) {
    event.preventDefault()
    history.pushState({ page: 1 }, "", "/")
  }

  changeDiagramTab(event) {
    event.preventDefault()
    switch (event.currentTarget.innerHTML) {
      case "All categories":
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

  goToImprint(event) {
    event.preventDefault()
    history.pushState({ page: 1 }, "", "imprint")
  }
  goToAbout(event) {
    event.preventDefault()
    history.pushState({ page: 1 }, "", "about")
  }
}
