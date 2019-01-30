import { h } from "jsx-dom"
import * as IndexedDB from "../../modules/indexeddb"
import * as DiagramsGlobal from "../../modules/diagramsGlobal"
import * as GlobalFunctions from "../../modules/globalFunctions"

//renderDiagramBudgets
export function renderDiagramBudgets() {
	DiagramsGlobal.prepareDiagramBlock(2)
	console.log("renderDiagramBudgets")
    
	//create canvas for chart
	let diagramms = document.getElementsByClassName("diagrams__article")
	let diagramm = diagramms[0]
	diagramm.classList.remove("diagrams__article--grid")
	// console.log(diagramm);
	diagramm.innerHTML = "<canvas id='budgets'></canvas>"
    
	//get data from db
	let dbPromise = IndexedDB.setUpDB()
	dbPromise
		.then(db => {
			let categories = IndexedDB.getCategories(db)
			return categories
		})
		.then(allCategories => {
			renderDiagram(allCategories)
		})
}

export function renderDiagram(categories){
	console.log("im in diagrams")
	let category_name = []
	let budget = []
	categories.forEach((category) => {
		category_name.push(category.name)
		budget.push(GlobalFunctions.roundToTwoDecimals(category.budget))
	})


	//TODO: CREATE DIAGRAM

	console.log(budget)
	window.ctx = document.getElementById("budgets").getContext("2d")
	let budgets = new Chart(ctx, {
		type: "bar",
		data:  {
			labels: category_name,
			datasets: [{
				label: "Budget in €",
				data: budget,
				backgroundColor: [
					"#eab669",
					"#c6d8cf",                
					"#f7c1c0",
					"#c7cbe7",
					"#e3cabf",                
					"#dae6e1",
					"#f6e1c1",
					"#fbdfdf",
					"#9ad2e2"
				],
				borderColor: [
					"#FFFFFF"
				],
				borderWidth: 3
			}]
		},
		options: {
			legend: {
				display: true,
				position: "top",
          
				labels: {
					boxWidth: 0,
					fontFamily: "Overlock",
					fontSize: 24
				}
			}
		}
	})
}