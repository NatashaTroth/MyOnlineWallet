import { IndexPage } from "../pages/renderApp"
import * as IndexedDB from "../modules/indexeddb";
import {addAccountsToIncomeOutgoingForm} from "./addIncomeOutgoing"
import { h } from "jsx-dom";
import {roundToTwoDecimals}from "../modules/globalFunctions";



export function loadAccountData() {
    let dbPromise = IndexedDB.setUpDB();
    return dbPromise.then(db => {
      let accounts = IndexedDB.getAccounts(db);
      console.log(accounts + " accounts");
      return accounts;
    });
  }

 export function renderAccounts(allAccounts) {
    let accountBlock = document.querySelector(".js-accounts-article");
   
    accountBlock.innerHTML = "";
    
    accountBlock.appendChild(
      <ul class="js-listOfAccounts main__child2__section__article__ul" />
    );

    let accountList = document.querySelector(".js-listOfAccounts");
    allAccounts.forEach(account => {
      account.amount = roundToTwoDecimals(account.amount);
      accountList.appendChild(
        <li class="main__child2__section__article__ul__li">
          <p>{account.name}</p>
          <p>{account.amount}</p>
        </li>
      );
    });
    addAccountsToIncomeOutgoingForm(allAccounts);
  }