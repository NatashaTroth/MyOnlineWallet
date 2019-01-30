import { openDb } from "idb"

export function setUpDB() {
	// let indexedDB =
	//   window.indexedDB ||
	//   window.mozIndexedDB ||
	//   window.webkitIndexedDB ||
	//   window.msIndexedDB ||
	//   window.shimIndexedDB
	// if (!window.indexedDB) {
	//     window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
	// }

	//open db
	return openDb("MyOnlineWalletDatabase", 6, upgradeDb => {
		console.log("Heere")
		if (!upgradeDb.objectStoreNames.contains("accounts")) {
			upgradeDb.createObjectStore("accounts", { keyPath: "name" })
		}
		if (!upgradeDb.objectStoreNames.contains("categories")) {
			upgradeDb.createObjectStore("categories", { keyPath: "name" })
		}
	})
}

export function addToDb(objectStoreName, item) {
	let dbPromise = setUpDB()
	return dbPromise
		.then(db => {
			switch (objectStoreName) {
			case "accounts":
				addAccount(db, item.name, item.amount)
				break

			case "categories":
				addCategory(db, item.name, item.budget)
				break

			case "incomeOutgoing":
				addIncomeOutgoing(
					db,
					parseFloat(item.amount),
					item.category,
					item.account,
					item.type
				)
				break
			}
			return db
		})
		.catch(() => {
			console.log("Error! Object could not be added to the database")
		})
}

export function getAccounts(db) { //REFACTOR TO REMOVE DB
	return db
		.transaction("accounts")
		.objectStore("accounts")
		.getAll()
}
export function getAccount(name){
	let dbPromise = setUpDB()
	return dbPromise.then(db => {
		return db.transaction("accounts").objectStore("accounts").get(name)
	})
}


export function getCategories(db) {
	return db
		.transaction("categories")
		.objectStore("categories")
		.getAll()
}

export function getCategory(name){
	let dbPromise = setUpDB()
	return dbPromise.then(db => {
		return db.transaction("categories").objectStore("categories").get(name)
	})
}

export function deleteAllAcounts(){
	let dbPromise = setUpDB()
	return dbPromise.then(db => {
		const tx = db.transaction("accounts", "readwrite")
		tx.objectStore("accounts").clear()
		return tx.complete
	})
}

export function addAccounts(items){
	console.log("AddAccountSS")
	let dbPromise = setUpDB()
	return dbPromise.then(db => {
		console.log("HEEEEY")
		for(let i = 0; i < items.length; i++){
			let name = items[i].name
			let amount = items[i].amount
			console.log(name + " NAME " + amount)

			const tx = db.transaction("accounts", "readwrite")
			tx.objectStore("accounts").put({
				name: name,
				amount: parseFloat(amount)
			})
		}
	})

}
// export function getCategoriesLength(){
//   let dbPromise = setUpDB();
//     return dbPromise.then(db => {
//       let categories = getCategories(db);

//       return categories;
//     })
//     .then((allCategories) => {
//       return allCategories.length
//     })
// }

//----------------private functions----------------
function addIncomeOutgoing(db, amount, category, account, type) {
	if (type === "outgoing") amount = -amount

	let updateAccountComplete = updateAccount(db, account, account, amount)
	updateAccountComplete
		.then(() => console.log("The account was successfully updated"))
		.catch(() => console.log("Error! The account could not be updated"))

	let updateCategoryComplete = updateCategory(db, category, false, false, amount)    //REFACTOR
	updateCategoryComplete
		.then(() => console.log("The category was successfully updated"))    
		.catch(() => console.log("Error! The category could not be updated"))
}

function addCategory(db, name, budget) {
	const tx = db.transaction("categories", "readwrite")
	tx.objectStore("categories").put({
		name: name,
		budget: parseFloat(budget),
		spent: 0.00,
		remaining: parseFloat(budget)

	})
	return tx.complete
}

function addAccount(db, name, amount) {
	//console.log("I GOT HERE")
	const tx = db.transaction("accounts", "readwrite")
	tx.objectStore("accounts").put({
		name: name,
		amount: parseFloat(amount)
	})
	return tx.complete
}

function updateAccount(db, account, newName, amount) {
	const tx = db.transaction("accounts", "readwrite")
	tx.objectStore("accounts").iterateCursor(cursor => {
		if (!cursor) return
		if (cursor.value.name === account) {
			const updateData = cursor.value
			updateData.name = newName
			updateData.amount += amount

			const request = cursor.update(updateData)
			request.onsuccess = function() {
				console.log("Account was successfully updated!")
				return tx.complete
			}
		}
		cursor.continue()
	})
	return tx.complete
}

function updateCategory(db, category, newName, newBudget, amount) {
	console.log("amount " + amount)
	const tx = db.transaction("categories", "readwrite")
	tx.objectStore("categories").iterateCursor(cursor => {
		if (!cursor) return
		if (cursor.value.name === category) {
			const updateData = cursor.value
			if(newName)   //srings are true
				updateData.name = newName
			if(newBudget)
				updateData.budget = newBudget

			if(amount){
				updateData.spent -= amount
				updateData.remaining += amount
			}
        
			const request = cursor.update(updateData)
			request.onsuccess = function() {
				console.log("Category was successfully updated!")
				return tx.complete
			}
		}
		cursor.continue()
	})
	return tx.complete
}
