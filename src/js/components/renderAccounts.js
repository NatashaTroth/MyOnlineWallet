import { IndexPage } from "../pages/renderApp"
import * as IndexedDB from "../modules/indexeddb";
import {addAccountsToIncomeOutgoingForm} from "./addIncomeOutgoing"
import { h } from "jsx-dom";
import {roundToTwoDecimals, convertCurrencyToString}from "../modules/globalFunctions";

import editIcon from "../../images/edit.svg"
import {updateAccounts, renderEditAccounts} from "./renderEditAccounts"


export function loadAccountData() {
    let dbPromise = IndexedDB.setUpDB();
    return dbPromise.then(db => {
      let accounts = IndexedDB.getAccounts(db);
      console.log(accounts + " accounts");
      return accounts;
    });
  }

 export function renderAccounts(allAccounts) {
  console.log("IN RENDER ACCOUNTS")

    let accountBlock = document.querySelector(".js-accounts-article");
   
    accountBlock.innerHTML = "";

    
    accountBlock.appendChild(
      <ul class="js-listOfAccounts main__child2__accounts__article__ul" />
    );

    let accountList = document.querySelector(".js-listOfAccounts");
    allAccounts.forEach(account => {
      account.amount = convertCurrencyToString(account.amount);
      accountList.appendChild(
        <li class="main__child2__accounts__article__ul__li">
          <p class="main__child2__accounts__article__ul__li__p--first">{account.name}</p>
          <p class="main__child2__accounts__article__ul__li__p--last">{account.amount}</p>
        </li>
      );
    });

    //change back to edit button (incase account is added in editing mode)
      let editButton = document.querySelector(".js-accounts-edit-Icon")

      
			editButton.src = editIcon
			editButton.alt="Circle with a pencil icon inside."

			let editAccountbtn = document.querySelector(".main__child2__headlineIcon__link")
			editAccountbtn.removeEventListener("click", updateAccounts)
      editAccountbtn.addEventListener("click", renderEditAccounts)
      
    addAccountsToIncomeOutgoingForm(allAccounts);
  }