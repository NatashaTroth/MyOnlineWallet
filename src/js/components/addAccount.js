import { IndexPage } from "../pages/renderApp"
import * as IndexedDB from "../modules/indexeddb"
import {
  validateDatabase,
  validateAccountsFormData
} from "./globalValidationFunctions"

export function addAccount(event) {
  event.preventDefault(event)
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
      if (!result) throw "Error!"
    })
    .then(() => {
      let item = { name: name, amount: amount }
      let result = IndexedDB.addToDb("accounts", item)
      result
        .then(() => {
          //empty input fields
          document.querySelector(".js-add-account .js-name").value = ""
          document.querySelector(".js-add-account .js-amount").value = ""
          IndexPage.reloadAccounts()
        })
        .catch(() => {
          console.log("Error! The account could not be added")
        })
    })
    .catch(() => {
      console.log("Error! The database validation failed")
    })
}
