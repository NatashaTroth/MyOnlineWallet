import { openDb } from "idb"

export function setUpDB() {
	//open db
	return openDb("MyOnlineWalletDatabase", 6, upgradeDb => {
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

export function getAccounts(db) {
	return db
		.transaction("accounts")
		.objectStore("accounts")
		.getAll()
}
export function getAccount(name) {
	let dbPromise = setUpDB()
	return dbPromise.then(db => {
		return db
			.transaction("accounts")
			.objectStore("accounts")
			.get(name)
	})
}

export function getCategories(db) {
	return db
		.transaction("categories")
		.objectStore("categories")
		.getAll()
}

export function getCategory(name) {
	let dbPromise = setUpDB()
	return dbPromise.then(db => {
		return db
			.transaction("categories")
			.objectStore("categories")
			.get(name)
	})
}

export function deleteAllAcounts() {
	let dbPromise = setUpDB()
	return dbPromise.then(db => {
		const tx = db.transaction("accounts", "readwrite")
		tx.objectStore("accounts").clear()
		return tx.complete
	})
}

export function addAccounts(items) {
	let dbPromise = setUpDB()
	return dbPromise.then(db => {
		for (let i = 0; i < items.length; i++) {
			let name = items[i].name
			let amount = items[i].amount
			const tx = db.transaction("accounts", "readwrite")
			tx.objectStore("accounts").put({
				name: name,
				amount: parseFloat(amount)
			})
		}
	})
}

export function deleteAllCategories() {
	let dbPromise = setUpDB()
	return dbPromise.then(db => {
		const tx = db.transaction("categories", "readwrite")
		tx.objectStore("categories").clear()
		return tx.complete
	})
}

export function addCategories(items) {
	let dbPromise = setUpDB()
	return dbPromise.then(db => {
		for (let i = 0; i < items.length; i++) {
			let name = items[i].name
			let budget = items[i].budget
			let spent = items[i].spent
			let remaining = items[i].remaining
			const tx = db.transaction("categories", "readwrite")
			tx.objectStore("categories").put({
				name: name,
				budget: parseFloat(budget),
				spent: spent,
				remaining: remaining
			})
		}
	})
}
//----------------private functions----------------
function addIncomeOutgoing(db, amount, category, account, type) {
	if (type === "outgoing") amount = -amount

	let updateAccountComplete = updateAccount(db, account, account, amount)
	updateAccountComplete
		.then(() => {
			//The account was successfully updated
		})
		.catch(() => console.log("Error! The account could not be updated"))

	let updateCategoryComplete = updateCategory(
		db,
		category,
		false,
		false,
		amount
	)
	updateCategoryComplete
		.then(() => {
			//The category was successfully updated
		})
		.catch(() => console.log("Error! The category could not be updated"))
}

function addCategory(db, name, budget) {
	const tx = db.transaction("categories", "readwrite")
	tx.objectStore("categories").put({
		name: name,
		budget: parseFloat(budget),
		spent: 0.0,
		remaining: parseFloat(budget)
	})
	return tx.complete
}

function addAccount(db, name, amount) {
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
				//Account was successfully updated
				return tx.complete
			}
		}
		cursor.continue()
	})
	return tx.complete
}

function updateCategory(db, category, newName, newBudget, amount) {
	const tx = db.transaction("categories", "readwrite")
	tx.objectStore("categories").iterateCursor(cursor => {
		if (!cursor) return
		if (cursor.value.name === category) {
			const updateData = cursor.value
			if (newName) updateData.name = newName
			if (newBudget) updateData.budget = newBudget

			if (amount) {
				updateData.spent -= amount
				updateData.remaining += amount
			}

			const request = cursor.update(updateData)
			request.onsuccess = function() {
				//Category was successfully updated!
				return tx.complete
			}
		}
		cursor.continue()
	})
	return tx.complete
}
