export function prepareDiagramBlock(tabNumber) {
  let diagramsArticle = document.querySelector('.diagrams__article')
  diagramsArticle.innerHTML = ''
  let tabs = document.querySelectorAll('.diagrams__nav__ul__listItem__button')

  for (let i = 0; i < tabs.length; i++) {
    if (i === tabNumber) {
      tabs[tabNumber].style.background = '#85bdbf'
      tabs[tabNumber].style.color = '#FFFFFF'
    } else {
      tabs[i].style.background = '#FFFFFF'
      tabs[i].style.color = '#85bdbf'
    }
  }
}
