/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
import { hideMain } from "./hideMainGlobal"

export function renderImprint() {
	hideMain()
	let main = document.querySelector("main")
	main.appendChild(
		<article class="imprint__article media-block">
			<h1 class="imprint__article__h1">Imprint</h1>
			<p>
        This website was created for the MultiMediaProject 2a) at the University
        of Applied Sciences Salzburg (MultiMediaTechnology) by Veronika
        Muravytska Natasha Troth. <br />
        All data entered in is only stored locally and doesn't leave your
        browser.
			</p>
			<h2 class="imprint__article__h2">Flaticons:</h2>
			<ul class="imprint__article__ul">
				<li class="imprint__article__ul__li">
          List icon made by{" "}
					<a class="imprint__article__link" href="https://smashicons.com/">
            Smashicons
					</a>{" "}
          from{" "}
					<a class="imprint__article__link" href="https://www.flaticon.com/">
            www.flaticon.com
					</a>
				</li>
				<li class="imprint__article__ul__li">
          Voucher icon made by{" "}
					<a
						class="imprint__article__link"
						href="https://www.flaticon.com/authors/icongeek26"
					>
            Icongeek26
					</a>{" "}
          from{" "}
					<a class="imprint__article__link" href="https://www.flaticon.com/">
            www.flaticon.com
					</a>
				</li>
				<li class="imprint__article__ul__li">
          Shopping cart icon made by{" "}
					<a
						class="imprint__article__link"
						href="https://www.flaticon.com/authors/icongeek26"
					>
            Icongeek26
					</a>{" "}
          from{" "}
					<a class="imprint__article__link" href="https://www.flaticon.com/">
            www.flaticon.com
					</a>
				</li>
				<li class="imprint__article__ul__li">
          Chef's hat icon made by{" "}
					<a class="imprint__article__link" href="https://smashicons.com/">
            Smashicons
					</a>{" "}
          from{" "}
					<a class="imprint__article__link" href="https://www.flaticon.com/">
            www.flaticon.com
					</a>
				</li>
				<li class="imprint__article__ul__li">
          Discount icon made by{" "}
					<a class="imprint__article__link" href="https://www.freepik.com/">
            Freepik
					</a>{" "}
          from{" "}
					<a class="imprint__article__link" href="https://www.flaticon.com/">
            www.flaticon.com
					</a>
				</li>
				<li class="imprint__article__ul__li">
          Piggy bank icon made by{" "}
					<a class="imprint__article__link" href="https://www.freepik.com/">
            Freepik
					</a>{" "}
          from{" "}
					<a class="imprint__article__link" href="https://www.flaticon.com/">
            www.flaticon.com
					</a>
				</li>
				<li class="imprint__article__ul__li">
          Money bag icon made by{" "}
					<a
						class="imprint__article__link"
						href="https://www.flaticon.com/authors/gregor-cresnar"
					>
            Gregor Cresnar
					</a>{" "}
          from{" "}
					<a class="imprint__article__link" href="https://www.flaticon.com/">
            www.flaticon.com
					</a>
				</li>
				<li class="imprint__article__ul__li">
          Cash icon made by{" "}
					<a
						class="imprint__article__link"
						href="https://www.flaticon.com/authors/pause08"
					>
            Pause08
					</a>{" "}
          from{" "}
					<a class="imprint__article__link" href="https://www.flaticon.com/">
            www.flaticon.com
					</a>
				</li>
			</ul>
			<h2 class="imprint__article__h2">Chart.js:</h2>
			<p>
				<a class="imprint__article__link" href="https://www.chartjs.org/">
          Chart.js
				</a>{" "}
        is the library used to create the charts.
			</p>
		</article>
	)
}
