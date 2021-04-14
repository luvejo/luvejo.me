import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/brands'

import './css/main.scss'

// Mobile Menu Setup.
function initMenu() {
  const burger = document.querySelector('#burger')
  const menuContainer = document.querySelector('.menu-mobile')
  const menu = document.querySelector('.menu-mobile .menu')
  const menuReplace = document.querySelector('.menu-bar-replace')
  const menuLinks = document.querySelectorAll('.menu-mobile a')

  function toggleMenu() {
    menu.classList.toggle('active')
    burger.classList.toggle('active')
    menuContainer.classList.toggle('active')
    menuReplace.classList.toggle('active')

    const burgerIcons = document.querySelectorAll('#burger svg')

    // Switch between icons:
    burgerIcons.forEach((icon) => {
      icon.classList.toggle('active')
    })
  }

  burger.addEventListener('click', toggleMenu)
  menuLinks.forEach((link) => {
    link.addEventListener('click', toggleMenu)
  })
}

// Detect if document is ready.
function ready(callbackFunction) {
  if (document.readyState != 'loading') {
    callbackFunction(event)
  } else {
    document.addEventListener('DOMContentLoaded', callbackFunction)
  }
}

ready(initMenu)
