/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
import * as IndexedDB from "../../modules/indexeddb"
import * as DiagramsGlobal from "../../modules/diagramsGlobal"
import {
  roundToTwoDecimals,
  convertCurrencyToString
} from "../../modules/globalFunctions"

//renderDiagramSingleCat
export function renderDiagramSingleCat() {
  DiagramsGlobal.prepareDiagramBlock(1)

  //get data from db
  let dbPromise = IndexedDB.setUpDB()
  dbPromise
    .then(db => {
      let categories = IndexedDB.getCategories(db)
      return categories
    })
    .then(allCategories => {
      let diagramsArticle = document.querySelector(".diagrams__article")
      diagramsArticle.classList.remove("diagrams__article--grid")
      diagramsArticle.classList.remove("media-block__tips")
      if (allCategories.length <= 0) {
        diagramsArticle.appendChild(
          <p class="diagrams__article__no-chart-explanation">
            The "Single categories" chart shows each category in its own chart
            and depicts the ratio of spent and remaining per category, until
            your set budget is reached. Each chart will appear after adding
            category.
          </p>
        )
      } else renderDiagrams(allCategories)
    })
}

export function renderDiagrams(categories) {
  let colors = [
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
  let i = 0
  categories.forEach(category => {
    let categoryName = category.name
    let spent = roundToTwoDecimals(category.spent)
    let remaining = roundToTwoDecimals(category.remaining)
    let budget = roundToTwoDecimals(category.budget)

    //create canvas for chart for each category
    let diagram = document.querySelector(".diagrams__article")
    diagram.classList.add("diagrams__article--grid")
    let chart = document.createElement("div")
    chart.classList.add("diagrams__article__chart")
    chart.classList.add("chart")
    diagram.appendChild(chart)

    let canvas = document.createElement("canvas")
    canvas.id = categoryName
    canvas.classList.add("chart__canvas")
    chart.appendChild(canvas)
    //info for each chart
    let info = document.createElement("div")
    info.classList.add("chart__info")
    chart.appendChild(info)

    //category name
    let category_name = document.createElement("div")
    category_name.classList.add("chart__category")
    category_name.innerText = categoryName
    chart.appendChild(category_name)

    let info_remaining = document.createElement("p")
    info_remaining.classList.add("chart__info__remaining")
    info_remaining.innerText = convertCurrencyToString(remaining)
    let info_text = document.createElement("p")
    info_text.classList.add("chart__info__text")
    info_text.innerText = "left from"
    let info_budget = document.createElement("p")
    info_budget.classList.add("chart__info__budget")
    info_budget.innerText = convertCurrencyToString(budget)
    info.appendChild(info_remaining)
    info.appendChild(info_text)
    info.appendChild(info_budget)

    //DIAGRAM FOR EACH CATEGORY
    createDiagram(categoryName, colors, spent, remaining, i)

    i++
  })
}

function createDiagram(categoryName, colors, spent, remaining, i) {
  window.ctx = document.getElementById(categoryName).getContext("2d")
  /*eslint-disable */
  new Chart(ctx, {
    /*eslint-enable */
    type: "doughnut",
    data: {
      labels: ["Spent", "Remaining"],
      datasets: [
        {
          data: [spent, remaining],
          backgroundColor: ["#c4c4c4", colors[i]],
          borderColor: ["#FFFFFF"],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      onResize: function(chart) {
        chart.update()
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80 //percentage of how much is cut out of the middle of the circle (0 = pie chart, 50 = doughnut chart)
    }
  })
}
