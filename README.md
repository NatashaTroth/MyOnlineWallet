# My Online Wallet
## App in one sentence
My Online Wallet is a budget app that helps you keep track of all your incomes and outgoings. 

## Description
 Do you find it hard to keep track of all of your incomes and outgoings? Do you have your money spread over several different accounts? Are you tight on money and need to control how much you spend for different things? Well then this is the app for you! My Online Wallet helps you keep track of all your finances, all in one place. You have an overview of the amount of money in different accounts, you can quickly and easily add incomes and outgoings and you can group these into different, custom categories. The app gives you the opportunity to set a spending budget for each category. Furthermore, it helps you visualise your current financial situation by depicting it in different charts.

## Webpack 

### Installation
* If you haven't already, install [npm](https://www.npmjs.com/).
* Clone this repository to your local machine.
* `npm install`

### How to use
* `npm start` starts a local server. If you change any of the files in `src/`, the browser will reflect the changes automatically ("autorefresh", "autoreload").
* `npm run build` builds a production bundle in `dist/`
* `npm run lint` lints the project and tells you the mistakes in the code
* `npm run lintFix` lints the project, automatically fixes the mistakes it can fix and tells you the mistakes in the code that it cannot fix

### Features
* uses sass (supporting the scss-syntax), minifies and auto-prefixes your css for production
* auto-prefixing depending on your choice of browsers you want to support in `.browserslist.rc`
* uses hashes for the js/css-filenames to prevent caching problems
* autorefreshes browsers (autoreloads)
* concatenates and minifies your js-files using webpack's intelligent dependency graph
* ES6 support via babel out of the box
* creates all the files needed for production in the build directory
* minifies images (jpg, png, jpg, svg)
* includes various icon references for touch devices
* uses eslint to lint project

#### Single Page Application (SPA)
This app is a Single Page Application. Content is changed dynamically (without having to reload the page) using JavaScript. In order to dynamically insert data into the HTML, this app uses "jsx-dom" templating. There are no frameworks used. Just vanilla JavaScript.

#### Chart.js
My Online Wallet uses the "Chart.js" library to create charts.

#### IndexedDB
My Online Wallet uses IndexedDB to store all its data locally in each browser. 

#### BEM
In order to keep the CSS more structured and to keep the specificity constant, this app uses the BEM (Block Element Modifier) CSS Methodology.

#### Frontend setup
My Online Wallet uses Webpack, ESLint and Babel for the frontend project.



## Using My Online Wallet
### Getting started
The first thing you need to do when first arriving on My Online Wallet, is to add accounts and categories.

#### Accounts
Accounts are the different places you have money. For example: common accounts can be bank, credit card, cash or event your piggy bank. When adding an income or outgoing you choose an account to define what the payment type of that income/outgoing was. When creating an account, you give it a name and the current amount of money you have for this account.

#### Categories
One of the main functions of My Online Wallet is that you can set spending budgets for different categories. For example: common categories might be food, clothes, car, housing ... When creating a category, you give it a name and a spending budget. You can change these later using the edit button in the "Category Budgets" block.

#### Income/Outgoing
Now that you have set categories and accounts, you can add incomes and/or outgoings. For example: if you spent 30€ in the supermarket on food and you paid by cash, then you will add the following outgoing:
* Amount = 30.00
* Account = Cash
* Category = Food
* Incoming/Outgoing = Outgoing

#### Charts
In the centre of the app, you can find the diagrams. You can navigate through these using the tabs. The charts automatically update after changing your financial situation.

* The first chart "All categories" compares the amount of spent money (outgoings) per category. This chart will appear after adding your first outgoing.
* The second chart "Single categories" shows each category in its own chart and depicts the ratio of spent and remaining per category, until your set budget is reached. Each chart will appear after adding the corresponding category.
* The third chart "Budgets" compares how high the set budget is for each category. Each bar in the chart will appear after adding a category.

#### Viewing and editing Accounts
In the left top block "Accounts", you can view your accounts. You can edit or delete these by clicking on the pencil icon.

#### Viewing and editing Categories
In the left bottom block "Category Budgets", you can view each of your categories, along with a progress bar to see how much money you have spent and how much you can still spend (remaining), until your reach your set spending budget. You can edit or delete these by clicking on the pencil icon.



## About the authors and fulfilled goals through creating this project
### Authors
My Online Wallet was created by Veronika Muravytska and Natasha Troth.

### Our strengths
Our strengths, before the project, were design, HTML and CSS.

### Our weaknesses
Git Flow, JavaScript and planning the project ahead.

### Our learning goals
With this project we hoped to learn how to plan a project ahead, so that we can create it without any problems. 
We also hope to learn how to work on the same project at the same time using git.
Furthermore, we hope to expand our knowledge on JavaScript.

### Goals achieved
During and at the end of the project we managed to fulfill all our goals. Even though we had a few minor merge conflicts with git, it helped us learn how to resolve these and now we are less afraid of them. We both feel more secure using and debugging frontend technologies.
