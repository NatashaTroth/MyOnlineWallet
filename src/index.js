import "./sass/style.scss"
import { renderDiagramAllCats } from "./js/pages/diagrams/renderAllCatsDiagram"
import { renderDiagramSingleCat } from "./js/pages/diagrams/renderSingleCatDiagram"
import { renderDiagramBudgets } from "./js/pages/diagrams/renderBudgetsDiagram"
import { renderDiagramTips } from "./js/pages/diagrams/renderTipsDiagram"
import { renderImprint } from "./js/pages/renderImprint"
import { renderPageNotFound } from "./js/pages/renderPageNotFound"
import { IndexPage } from "./js/pages/renderApp"

const renderPage = path => {
	const root = document.getElementById("root")
	const indexPage = new IndexPage()

	switch (path) {
	case "/":
		renderDiagramAllCats()
		break
	case "single-category":
	case "/single-category":
		renderDiagramSingleCat()
		break
	case "budgets":
	case "/budgets":
		renderDiagramBudgets()
		break
	case "tips":
	case "/tips":
		renderDiagramTips()
		break
	case "imprint":
	case "/imprint":
		renderImprint()
		break
	default:
		renderPageNotFound()
	}
}

window.addEventListener(
	"popstate",
	function(event) {
		renderPage(window.location.pathname)
	},
	false
);

//Hack to create onpushstate listener for history changes
//(Source: Tarik Huber, DO NOT CHANGE THIS!)
(function(history) {
	var pushState = history.pushState
	history.pushState = function(state, title, path) {
		if (typeof history.onpushstate == "function") {
			history.onpushstate({ state, title, path })
		}
		return pushState.apply(history, arguments)
	}
})(window.history)
// DO NOT CHANGE THIS!

history.onpushstate = props => {
	renderPage(props.path)
}

renderPage(window.location.pathname)
