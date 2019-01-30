
import { IndexPage } from "../pages/renderApp"
import { h } from "jsx-dom";
import * as IndexedDB from "../modules/indexeddb";
import {roundToTwoDecimals}from "../modules/globalFunctions";
import {loadCategoryData, renderCategories} from "./renderCategories"
import {loadAccountData, renderAccounts} from "../components/renderAccounts"


export function validateDatabase(name, objectStore, limit) {
    //check database
    let request;
    switch (objectStore) {
      case "accounts":
        request = loadAccountData();
        break;
      case "categories":
        request = loadCategoryData();
        break;
    }
    return request
      .then(allObjects => {
        //check length
        if (allObjects.length >= limit) {
          throw `Error! You already have ${limit} ${objectStore}. This is the maximum amount!`;
        }
        //check for duplicate name
        allObjects.forEach(object => {
          //if category name already exists
          if (object.name == name) {
            switch (objectStore) {
              case "accounts":
                throw "Error! This account already exists";
              case "categories":
                throw "Error! This category already exists";
            }
          }
        });
      })
      .then(() => {
        //if validation passed (didn't go to catch)
        return true;
      })
      .catch(resp => {
        alert(resp);
        return false;
      });
  }