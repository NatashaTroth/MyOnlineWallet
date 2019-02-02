/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
import * as DiagramsGlobal from "../../modules/diagramsGlobal"
import list from "../../../images/1_list.svg"
import voucher from "../../../images/2_voucher.svg"
import cart from "../../../images/3_shopping-cart.svg"
import chef from "../../../images/4_chef.svg"
import sale from "../../../images/5_sale.svg"
import piggy from "../../../images/6_piggy-bank.svg"
import moneyBag from "../../../images/7_money-bag.svg"
import cash from "../../../images/8_money.svg"

//renderDiagramTips
export function renderDiagramTips() {
	//TODO
	DiagramsGlobal.prepareDiagramBlock(3)

	let tips = [
		"Create a shopping list prior to going shopping. If you have a list, then you know exactly what you need to buy and are less likely to look at items you don’t need. ",
		"Buy gift cards for online shops instead of paying with a credit card since these give you a spending limit.",
		"Never go shopping for food on an empty stomach! This leads to you buying more than you need.",
		"Refrain from eating out and ordering food. Home cooked meals are cheaper and can also be healthier.",
		"When shopping for food, be sure to keep an eye out for offers. If you shop for bargains,  not only will you save money but you will also have a meal plan.",
		"It is a good idea to store all money you don’t currently need in a savings account. These usually have higher interest rates. ",
		"If you don’t need a loan, don’t get one. If you don’t need the money to survive, then stay clear of it. It will eventually need paying back, with interest!",
		"Go shopping with cash instead of cards. It is easier to keep track of your  outgoings that way. When your wallet is empty, you know it’s time to stop. "
	]

	let colorsForTips = [
		"#E3CABF",
		"#C7CBE7",
		"#9AD2E2",
		"#F7C1C0",
		"#E3CABF",
		"#C7CBE7",
		"#9AD2E2",
		"#F7C1C0"
	]
	let icons = [list, voucher, cart, chef, sale, piggy, moneyBag, cash]

	let diagram = document.querySelector(".diagrams__article")
	diagram.classList.remove("diagrams__article--grid")
	diagram.classList.add("media-block__tips")
	let tips_article = document.querySelector(".media-block__tips")

	let i = 0
	while (i < 4) {
		tips_article.appendChild(
			<section class="media-block__tips__tip tip-block" />
		)
		let tip_class = document.getElementsByClassName("tip-block")
		let tip_element = tip_class[i]
		tip_element.appendChild(<img class="tip-block__icon" />)
		tip_element.appendChild(<p class="tip-block__text" />)
		let tip_icon_class = document.getElementsByClassName("tip-block__icon")
		let tip_icon = tip_icon_class[i]
		tip_icon.src = icons[i]
		let tip_text_class = document.getElementsByClassName("tip-block__text")
		let tip_text = tip_text_class[i]
		tip_text.innerText = tips[i]
		tip_element.style.background = colorsForTips[i]
		i++
	}
	tips_article.appendChild(
		<button class="tip-block__nav__forward-arrow">&#x3c;</button>
	)
	tips_article.appendChild(
		<button class="tip-block__nav__back-arrow">&gt;</button>
	)

	//tips arrow buttons
	let arrowBack = document.querySelector(".tip-block__nav__back-arrow")
	if (arrowBack)
		arrowBack.addEventListener("click", function() {
			changeToTipsNextPage(tips, icons, colorsForTips, i)
			i = (i + 4) % tips.length
		})

	let arrowForward = document.querySelector(".tip-block__nav__forward-arrow")
	if (arrowForward)
		arrowForward.addEventListener("click", function() {
			changeToTipsNextPage(tips, icons, colorsForTips, i)
			i = (i + 4) % tips.length
		})
}

export function changeToTipsNextPage(tips, icons, colorsForTips, n) {
	let i = n
	let tipsAmount = tips.length
	while (i < n + 4) {
		let tip_class = document.getElementsByClassName("tip-block")
		let tip_element = tip_class[i - n]
		tip_element.innerHTML = ""
		tip_element.appendChild(<img class="tip-block__icon" />)
		tip_element.appendChild(<p class="tip-block__text" />)
		let tip_icon_class = document.getElementsByClassName("tip-block__icon")
		let tip_icon = tip_icon_class[i - n]
		tip_icon.src = icons[i % tipsAmount]
		let tip_text_class = document.getElementsByClassName("tip-block__text")
		let tip_text = tip_text_class[i - n]
		tip_text.innerText = tips[i % tipsAmount]
		tip_element.style.background = colorsForTips[i % tipsAmount]
		i++
	}
}
