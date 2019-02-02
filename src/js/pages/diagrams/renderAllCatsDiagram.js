/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
import Chart from "chart.js"
import * as IndexedDB from "../../modules/indexeddb"
import * as DiagramsGlobal from "../../modules/diagramsGlobal"
import {
	roundToTwoDecimals,
	convertCurrencyToString
} from "../../modules/globalFunctions"

let diagram = document.querySelector(".diagrams__article")
let backgroundColor = [
	"#eab669",
	"#c6d8cf",
	"#f7c1c0",
	"#c7cbe7",
	"#e3cabf",
	"#dae6e1",
	"#f6e1c1",
	"#fbdfdf",
	"#9ad2e2"
]

//-------------------renderDiagramAllCats------------------
export function renderDiagramAllCats() {
	DiagramsGlobal.prepareDiagramBlock(0)
	//get data from db
	let dbPromise = IndexedDB.setUpDB()
	dbPromise
		.then(db => {
			let categories = IndexedDB.getCategories(db)
			return categories
		})
		.then(allCategories => {
			let diagramsArticle = document.querySelector(".diagrams__article")
			diagramsArticle.classList.remove("media-block__tips")
			diagramsArticle.classList.remove("diagrams__article--grid")
			if (allCategories.length <= 0) {
				diagramsArticle.appendChild(
					<p class="diagrams__article__no-chart-explanation">
            The "All Categories" chart compares the amount of spent money
            (outgoings) per category. This chart will appear after adding your
            first outgoing.
					</p>
				)
			} else renderDiagram(allCategories)
		})
}

export function renderDiagram(categories) {
	createCanvasForChart()

	let category_name = []
	let spent = []
	let totalSpent = 0
	let i = 0
	categories.forEach(category => {
		category_name.push(category.name)
		let spentNum = roundToTwoDecimals(category.spent)
		spent.push(spentNum)
		totalSpent += spentNum

		//info for each category (name and spent)
		let info = document.createElement("div")
		info.classList.add("diagrams__article__info")
		info.classList.add("info-all-categories")
		diagram.appendChild(info)

		let color_info = document.createElement("p")
		color_info.classList.add("info-all-categories__color")
		info.appendChild(color_info)
		color_info.style.background = backgroundColor[i]

		let category_info = document.createElement("p")
		category_info.classList.add("info-all-categories__category-name")
		info.appendChild(category_info)
		category_info.innerText = category.name //category_name[i]

		let spent_info = document.createElement("p")
		spent_info.classList.add("info-all-categories__spent")
		info.appendChild(spent_info)
		spent_info.innerText = convertCurrencyToString(category.spent) //spent[i] + "€"

		i++
	})

	//add explanation if there have been no outgoings
	if (totalSpent <= 0) {
		let diagramsArticle = document.querySelector(".diagrams__article")
		diagramsArticle.innerHTML = ""
		diagramsArticle.appendChild(
			<p class="diagrams__article__no-chart-explanation">
        The "All Categories" chart compares the amount of spent money
        (outgoings) per category. This chart will appear after adding your first
        outgoing.
			</p>
		)
		return
	}

	//info about total spent
	let totalSpentP = document.createElement("p")
	totalSpentP.classList.add("diagrams__article__total-spent")
	totalSpentP.innerText = "Total Spent: " + convertCurrencyToString(totalSpent)
	diagram.appendChild(totalSpentP)

	createDiagram(category_name, spent, backgroundColor)
}

function createCanvasForChart() {
	diagram.appendChild(<canvas id="allCats" />)
	let titles = document.createElement("div")
	diagram.appendChild(titles)
	titles.classList.add("diagrams__article__title")

	titles.appendChild(<p class="diagrams__article__title__category">Category</p>)
	titles.appendChild(<p class="diagrams__article__title__spent">Spent</p>)
}

function createDiagram(category_name, spent, backgroundColor) {
	let ctx = document.getElementById("allCats").getContext("2d")
	new Chart(ctx, {
		type: "doughnut",
		data: {
			labels: category_name,
			datasets: [
				{
					data: spent,
					backgroundColor: backgroundColor,
					borderColor: ["#FFFFFF"],
					borderWidth: 3
				}
			]
		},
		options: {
			legend: {
				display: true,
				position: "top",
				labels: {
					fontFamily: "Overlock",
					fontSize: 16
				}
			}
		}
	})
}
