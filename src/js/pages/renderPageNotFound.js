import piggyBank from "../../images/6_piggy-bank-black.svg"
/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
import { hideMain } from "./hideMainGlobal"

export function renderPageNotFound() {
	let main = document.querySelector("main")
	hideMain()
	main.appendChild(
		<article class="pageNotFound__article media-block">
			<h1 class="pageNotFound__article__h1">Page not found!</h1>
			<img
				class="pageNotFound__article__img"
				src={piggyBank}
				alt="Grimace emoji"
			/>
			<p class="pageNotFound__article__p">
        Oops! There's no money here! This page doesn't exist.{" "}
			</p>
		</article>
	)
}
