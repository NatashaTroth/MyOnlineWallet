import { h } from "jsx-dom";
import Chart from 'chart.js';
import * as IndexedDB from "../../modules/indexeddb";
import * as DiagramsGlobal from "../../modules/diagramsGlobal"
import * as GlobalFunctions from "../../modules/globalFunctions";

//-------------------renderDiagramAllCats------------------
export function renderDiagramAllCats() {
    DiagramsGlobal.prepareDiagramBlock(0)
    //create canvas for chart
    let diagramms = document.getElementsByClassName("diagrams__article");
    let diagramm = diagramms[0];
    diagramm.classList.remove("diagrams__article--grid");
    // console.log(diagramm);
    diagramm.appendChild(
      <canvas id="allCats"></canvas>
    );
    //get data from db
    let dbPromise = IndexedDB.setUpDB();
    dbPromise
      .then(db => {
        let categories = IndexedDB.getCategories(db);
        return categories;
      })
      .then(allCategories => {
          renderDiagram(allCategories)
      })
    console.log("renderDiagramAllCats");
  }
  

  export function renderDiagram(categories){
    console.log("im in diagrams")
    let category_name = []
    let spent = []
    categories.forEach((category) => {
        // console.log(category.name)
        category_name.push(category.name)
        // console.log(GlobalFunctions.roundToTwoDecimals(category.spent))
        spent.push(GlobalFunctions.roundToTwoDecimals(category.spent))
    })


    //DIAGRAM

    let ctx = document.getElementById("allCats").getContext('2d');
    let allCats = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: category_name,
        datasets: [{
          data: spent,
          backgroundColor: [
            '#eab669',
            '#c6d8cf',
            '#f7c1c0',
            '#c7cbe7',
            '#e3cabf',
            '#dae6e1',
            '#f6e1c1',
            '#fbdfdf',
            '#9ad2e2'
          ],
          borderColor: [
            '#FFFFFF'
          ],
          borderWidth: 3
        }]
      },
      options: {
        legend: {
          display: true,
          position: "top",
          labels: {
            fontFamily: 'Overlock',
            fontSize: 16
          }
        }
      }
    });
}