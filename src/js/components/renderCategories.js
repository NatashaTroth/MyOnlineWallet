import { IndexPage } from '../pages/renderApp'
import * as IndexedDB from '../modules/indexeddb'
import { addCategoriesToIncomeOutgoingForm } from './addIncomeOutgoing'
import { h } from 'jsx-dom'
import {
  roundToTwoDecimals,
  convertCurrencyToString,
  calculatePercentSpent,
} from '../modules/globalFunctions'
import { updateCategories, renderEditCategories } from './renderEditCategories'
import editIcon from '../../images/edit.svg'

export function loadCategoryData() {
  let dbPromise = IndexedDB.setUpDB()
  return dbPromise.then(db => {
    let categories = IndexedDB.getCategories(db)
    return categories
  })
}

export function renderCategories(allCategories) {
  let categoryBlock = document.querySelector('.js-categories-article')
  console.log('render Categories YaAAS')

  categoryBlock.innerHTML = ''

  console.log('ALL CATEGORIES LENGTH ')
  if (allCategories.length <= 0) {
    categoryBlock.appendChild(<p>No categories have been added yet.</p>)
  } else {
    allCategories.forEach(category => {
      category.budget = roundToTwoDecimals(category.budget)
      category.spent = roundToTwoDecimals(category.spent)
      category.remaining = roundToTwoDecimals(category.remaining)
      console.log('NEWCATS: ' + category.budget)

      let spentPercent = calculatePercentSpent(
        parseFloat(category.spent),
        parseFloat(category.remaining),
      )

      categoryBlock.appendChild(
        <article class={'main__child2__categories__' + category.name}>
          <h3 class="main__child2__categories__h3">{category.name}</h3>
          <div class="main__child2__categories__labels">
            <p>Spent: {convertCurrencyToString(category.spent)}</p>
            <p>Remaining: {convertCurrencyToString(category.remaining)}</p>
          </div>

          <div class="main__child2__categories__js-progressbar--back">
            <div class="main__child2__categories__js-progressbar--front">
              <span class="main__child2__categories__js-progressbar__text--remaining" />
            </div>
          </div>
        </article>,
      )

      let progressbar = document.querySelector(
        '.main__child2__categories__' +
          category.name +
          ' .main__child2__categories__js-progressbar--front',
      )
      console.log(progressbar + ' PROGRESS BAR')
      progressbar.style.width = spentPercent + '%'
      //progressbar.style.webkitTransition = 'width 1s';
    })
    //change back to edit button
    let editButton = document.querySelector('.js-categories-edit-icon')

    editButton.src = editIcon
    console.log('HERE I AM')

    editButton.alt = 'Circle with a pencil icon inside.'
    console.log('HEERREE IN RENDER' + editButton)
    let editCategorybtn = document.querySelector(
      '.main__child2__categories__headlineIcon__link',
    )
    editCategorybtn.removeEventListener('click', updateCategories)
    editCategorybtn.addEventListener('click', renderEditCategories)

    addCategoriesToIncomeOutgoingForm(allCategories)
  }
}
