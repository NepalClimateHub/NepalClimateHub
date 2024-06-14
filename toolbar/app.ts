import { defineToolbarApp } from 'astro/toolbar'
// import { getPageCo2 } from './page-co2'

class AstroCo2 extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

}

window.customElements.define('astro-co2', AstroCo2)

export default defineToolbarApp({
  init(canvas) {
    const load = () => {
      // Add the UI.
      const container = document.createElement('astro-dev-toolbar-window')
      const astroCo2 = document.createElement('astro-co2')
      container.appendChild(astroCo2)
      canvas.append(container)

      // Check the total CO2 and show any warnings.

      // const pageCo2 = getPageCo2()
      // TODO: lets refactor this part when the build error due to @tgwf/co2 library - plus its unclear what category refers to here.
      // const totalCo2 = pageCo2.reduce(
      //   (total, category) => total + category.totalCo2,
      //   0
      // )
      // if (totalCo2 > 1) {
      //   app.toggleNotification({
      //     state: true,
      //     level: 'warning',
      //   })
      // }
    }

    // Load the UI when the page is loaded.
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => setTimeout(load, 3000))
    } else {
      setTimeout(load, 3000)
    }
  },
})
