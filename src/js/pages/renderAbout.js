/*eslint-disable */
import { h } from "jsx-dom"
/*eslint-enable */
import { hideMain } from "./hideMainGlobal"

export function renderAbout() {
	let main = document.querySelector("main")
	hideMain()
	main.appendChild(
		<article class="about__article media-block">
			<h1 class="about__article__h1">About</h1>
			<p class="about__article__p">
        Do you find it hard to keep track of all of your incomes and outgoings?{" "}
				<br />
        Do you have your money spread over several different accounts?
				<br />
        Are you tight on money and need to control how much you spend for
        different things? <br />
        Well then this is the app for you!
			</p>
			<p>
        My Online Wallet helps you keep track of all your finances, all in one
        place. You have an overview of the amount of money in different
        accounts (Payment types), you can quickly and easily add incomes and outgoings and you
        can group these into different, custom categories. The app gives you the
        opportunity to set a spending budget for each category. Furthermore, it
        helps you visualise your current financial situation by depicting it in
        different charts.
			</p>

			<h2 class="about__article__h2">Getting started</h2>

			<p>
        The first thing you need to do when first arriving on My Online Wallet,
        is to add accounts and categories.
			</p>
			<h3 class="about__article__h3">Accounts</h3>
			<p>
      Accounts are the different places you have money. For example: common accounts 
      can be bank, credit card, cash or event your piggy bank. When adding an transaction 
      (income or outgoing) you choose an account to define what the payment type of that 
      transaction was. When creating an account, you give it a name and the current amount 
      of money you have for this account.
			</p>

			<h3 class="about__article__h3">Categories</h3>
			<p>
        One of the main functions of My Online Wallet is that you can set
        spending budgets for different categories. For example: common
        categories might be food, clothes, car, housing ... When creating a
        category, you give it a name and a spending budget. You can change these
        later using the edit button in the "Category Budgets" block.
			</p>

			<h3 class="about__article__h3">Transaction</h3>
			<p>
      Now that you have set categories and accounts, you can add transactions 
      (income or outgoing). For example: if you spent 30€ in the supermarket on 
      food and you paid by cash, then you will add the following outgoing:{" "}
				<br />
        Amount = 30.00 <br />
        Payment type = Cash <br />
        Category = Food <br />
        Incoming/Outgoing = Outgoing
			</p>

			<h3 class="about__article__h3">Charts</h3>
			<p>
        In the centre of the app, you can find the diagrams. You can navigate
        through these using the tabs. The charts automatically update after
        changing your financial situation.
			</p>
			<ul class="about__article__ul">
				<li>
          The first chart "All categories" compares the amount of spent money
          (outgoings) per category. This chart will appear after adding your
          first outgoing.
				</li>
				<li>
          The second chart "Single categories" shows each category in its own
          chart and depicts the ratio of spent and remaining per category, until
          your set budget is reached. Each chart will appear after adding the
          corresponding category.
				</li>
				<li>
          The third chart "Budgets" compares how high the set budget is for each
          category. Each bar in the chart will appear after adding a category.
				</li>
			</ul>

			<h3 class="about__article__h3">Viewing and editing Accounts</h3>
			<p>
        In the left top block "Accounts", you can view your accounts. You can
        edit or delete these by clicking on the pencil icon.
			</p>

			<h3 class="about__article__h3">Viewing and editing Categories</h3>
			<p>
        In the left bottom block "Category Budgets", you can view each of your
        categories, along with a progress bar to see how much money you have
        spent and how much you can still spend (remaining), until your reach
        your set spending budget. You can edit or delete these by clicking on
        the pencil icon.
			</p>
		</article>
	)
}
