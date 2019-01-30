import { IndexPage } from "../pages/renderApp"
import * as IndexedDB from "../modules/indexeddb";
import {addCategoriesToIncomeOutgoingForm} from "./addIncomeOutgoing"
import { h } from "jsx-dom";
import {roundToTwoDecimals}from "../modules/globalFunctions";



export function loadCategoryData() {
    let dbPromise = IndexedDB.setUpDB();
    return dbPromise.then(db => {
      let categories = IndexedDB.getCategories(db);
      return categories;
    });
  }

export function renderCategories(allCategories) {
    let categoryBlock = document.querySelector(".js-categories-article");
    categoryBlock.innerHTML = "";
    allCategories.forEach(category => {
      category.budget = roundToTwoDecimals(category.budget);
      category.spent = roundToTwoDecimals(category.spent);
      category.remaining = roundToTwoDecimals(
        category.remaining
      );

      categoryBlock.appendChild(
        <p>
          name: {category.name}, budget: {category.budget}, spent:
          {category.spent}, remaining: {category.remaining}
        </p>
      );
    });
    addCategoriesToIncomeOutgoingForm(allCategories);
  }
