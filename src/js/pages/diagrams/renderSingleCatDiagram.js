import { h, createElement } from "jsx-dom";
import * as IndexedDB from "../../modules/indexeddb";
import * as DiagramsGlobal from "../../modules/diagramsGlobal"
import * as GlobalFunctions from "../../modules/globalFunctions";

//renderDiagramSingleCat
export function renderDiagramSingleCat() {
    DiagramsGlobal.prepareDiagramBlock(1)

    //get data from db
    let dbPromise = IndexedDB.setUpDB();
    dbPromise
      .then(db => {
        let categories = IndexedDB.getCategories(db);
        return categories;
      })
      .then(allCategories => {
          renderDiagrams(allCategories)
      })
    console.log("renderDiagramSingleCat");
  }

export function renderDiagrams(categories) {
  console.log("in single diagrams")
  let colors = ['#eab669', '#c6d8cf', '#f7c1c0', '#c7cbe7', '#e3cabf', '#dae6e1', '#f6e1c1', '#fbdfdf', '#9ad2e2']
  let i=0;
  categories.forEach((category) => {
    let categoryName = category.name
    let spent = GlobalFunctions.roundToTwoDecimals(category.spent)
    let remaining = GlobalFunctions.roundToTwoDecimals(category.remaining)
    let budget = GlobalFunctions.roundToTwoDecimals(category.budget)
    console.log(categoryName);
    console.log(spent);
    console.log(remaining);

    //create canvas for chart for each category
    let diagramms = document.getElementsByClassName("diagrams__article");
    let diagramm = diagramms[0];
    diagramm.classList.add("diagrams__article--grid");
    let chart = document.createElement("div");
    chart.classList.add("diagrams__article__chart");
    chart.classList.add("chart");
    diagramm.appendChild(chart);

    let canvas = document.createElement("canvas");
    canvas.id = categoryName;
    canvas.classList.add("chart__canvas");
    canvas.style.width = "33% !important";
    canvas.style.height = "33% !important";
    chart.appendChild(canvas);

    //info for each chart
    let info = document.createElement("div");
    info.classList.add("chart__info");
    chart.appendChild(info);

    let info_remaining = document.createElement("p");
    info_remaining.classList.add("chart__info__remaining");
    info_remaining.innerText = remaining + "€";
    let info_text = document.createElement("p");
    info_text.classList.add("chart__info__text");
    info_text.innerText = "left from";
    let info_budget = document.createElement("p");
    info_budget.classList.add("chart__info__budget");
    info_budget.innerText = budget + "€";
    info.appendChild(info_remaining);
    info.appendChild(info_text);
    info.appendChild(info_budget);
    
    //DIAGRAM FOR EACH CATEGORY
    window.ctx = document.getElementById(categoryName).getContext('2d');
    let eachCategory = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Spent", "Remaining"],
        datasets: [{
          data: [spent, remaining],
          backgroundColor: [
            '#c4c4c4',
            colors[i]
          ],
          borderColor: [
            '#FFFFFF'
          ],
          borderWidth: 0
        }]
      },
      options: {
        cutoutPercentage: 80,   //percentag of how much is cut out of the middle of the circle (0 = pie chart, 50 = doughnut chart)
      }
    });
    i++;
  })

}