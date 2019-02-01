/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
import * as IndexedDB from "../../modules/indexeddb"
import * as DiagramsGlobal from "../../modules/diagramsGlobal"
import { roundToTwoDecimals } from "../../modules/globalFunctions"

export function renderDiagramBudgets() {
  DiagramsGlobal.prepareDiagramBlock(2)
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
            The "Budgets" chart compares how high the set budget is for each
            category. Each bar in the chart will appear after adding a category.
          </p>
        )
      } else renderDiagram(allCategories)
    })
}

export function renderDiagram(categories) {
  createCanvas()
  let category_name = []
  let budget = []
  categories.forEach(category => {
    category_name.push(category.name)
    budget.push(roundToTwoDecimals(category.budget))
  })

  createDiagram(category_name, budget)
}

function createCanvas() {
  let diagram = document.querySelector(".diagrams__article")
  diagram.innerHTML = "<canvas id='budgets' height='200%'></canvas>"
}

function createDiagram(category_name, budget) {
  window.ctx = document.getElementById("budgets").getContext("2d")
  /*eslint-disable */
  new Chart(ctx, {
    /*eslint-enable */
    type: "bar",
    data: {
      labels: category_name,
      datasets: [
        {
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
          boxWidth: 0,
          fontFamily: "Overlock",
          fontSize: 24
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  })
}
