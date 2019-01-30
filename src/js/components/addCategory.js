import { IndexPage } from "../pages/renderApp"
import { h } from "jsx-dom";
import * as IndexedDB from "../modules/indexeddb";
import {roundToTwoDecimals}from "../modules/globalFunctions";
import {validateDatabase}from "./globalFunctions";

export function addCategory(event) {
    event.preventDefault();
    console.log("add category button");
    let name = document.querySelector(".js-add-category .js-name").value;
    let budget = document.querySelector(".js-add-category .js-budget").value;

    //Validations & add to database
    let errorMsg = validateCategoriesFormData(name, budget);
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    let complete = validateDatabase(name, "categories", 9);
    complete
      .then(result => {
        console.log("result: " + result);
        if (!result) throw "Error!"; // You already have 9 categories. This is the maximum amount! Delete a category to add a new one."
      })
      .then(() => {
        let item = { name: name, budget: budget };
        let result = IndexedDB.addToDb("categories", item);
        result
          .then(() => {
            console.log("Category was successfully added");
            IndexPage.reloadCategories();
            IndexPage.reloadDiagrams();
          })
          .catch(resp => {
            console.log("Error! The category could not be added");
          });
      })
      .catch(resp => {
        console.log("Error! The database validation failed");
      });
  }

  function validateCategoriesFormData(name, number) {
    //check form input
    let errorMsg = "";
    if (name == null || name.length == 0)
      errorMsg += "You must enter a name.\n";
    if (number == null || number == "")
      errorMsg += "You must enter a budget.\n";
    if (isNaN(number)) errorMsg += "The budget must be a number.";
    else if(parseFloat(number) < 0) errorMsg += "The budget must be a positive number.\n"
    if (errorMsg) return `Error! ${errorMsg}`;
  }
