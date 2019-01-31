import piggyBank from '../../images/6_piggy-bank-black.svg'
import { h } from 'jsx-dom'
import { hideMain } from './hideMainGlobal'

export function renderPageNotFound() {
  console.log('renderPageNotFound')
  let main = document.querySelector('main')
  hideMain()
  main.appendChild(
    <article class="pageNotFound__article">
      <h1 class="pageNotFound__article__h1">Page not found!</h1>
      <img
        class="pageNotFound__article__img"
        src={piggyBank}
        alt="Grimace emoji"
      />
      <p class="pageNotFound__article__p">
        Oops! There's no money here! This page doesn't exist.{' '}
      </p>
    </article>,
  )
}
